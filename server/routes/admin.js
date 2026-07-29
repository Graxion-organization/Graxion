import express from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { protect } from '../middleware/auth.js';
import { ipProtection } from '../middleware/ipProtection.js';

const router = express.Router();

// Apply IP and Location based protection to ALL admin routes
router.use(ipProtection);

/**
 * Generate JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

/**
 * @route   POST /api/admin/setup
 * @desc    Create first admin account (one-time setup)
 * @access  Public (only works if no admin exists)
 */
router.post('/setup', async (req, res) => {
  try {
    // Check if any admin exists
    const existingAdmin = await Admin.countDocuments();
    if (existingAdmin > 0) {
      return res.status(400).json({
        success: false,
        message: 'Admin already exists. Use login instead.',
      });
    }

    const { username, email, password, setupKey } = req.body;

    // Verify setup key
    if (setupKey !== process.env.ADMIN_SETUP_KEY) {
      return res.status(403).json({
        success: false,
        message: 'Invalid setup key',
      });
    }

    const admin = await Admin.create({
      username,
      email,
      password,
      role: 'superadmin',
    });

    const token = generateToken(admin._id);

    res.status(201).json({
      success: true,
      data: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        token,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Username or email already exists',
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * @route   POST /api/admin/login
 * @desc    Login admin
 * @access  Public
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Find admin and include password field
    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    if (!admin.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated. Contact superadmin.',
      });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save({ validateBeforeSave: false });

    const token = generateToken(admin._id);

    res.json({
      success: true,
      data: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * @route   GET /api/admin/me
 * @desc    Get current admin profile
 * @access  Private
 */
router.get('/me', protect, async (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.admin._id,
      username: req.admin.username,
      email: req.admin.email,
      role: req.admin.role,
      lastLogin: req.admin.lastLogin,
    },
  });
});

/**
 * @route   PUT /api/admin/change-password
 * @desc    Change admin password
 * @access  Private
 */
router.put('/change-password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const admin = await Admin.findById(req.admin._id).select('+password');
    const isMatch = await admin.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }

    admin.password = newPassword;
    await admin.save();

    const token = generateToken(admin._id);

    res.json({
      success: true,
      message: 'Password changed successfully',
      data: { token },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * @route   GET /api/admin/check-setup
 * @desc    Check if admin setup is required
 * @access  Public
 */
router.get('/check-setup', async (req, res) => {
  try {
    const count = await Admin.countDocuments();
    res.json({
      success: true,
      setupRequired: count === 0,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
