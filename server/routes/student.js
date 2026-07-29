import express from 'express';
import jwt from 'jsonwebtoken';
import Internship from '../models/Internship.js';
import Otp from '../models/Otp.js';
import { sendOtpEmail } from '../utils/email.js';
import { protectStudent } from '../middleware/studentAuth.js';

const router = express.Router();

/**
 * @route   POST /api/student/send-otp
 * @desc    Send OTP to student's email
 * @access  Public
 */
router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

    const normalizedEmail = email.toLowerCase().trim();

    // Check if any internship exists for this email
    const internships = await Internship.find({ email: normalizedEmail });
    
    if (!internships || internships.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No records found for this email address',
      });
    }

    // Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Remove old OTPs for this email to prevent spam issues
    await Otp.deleteMany({ email: normalizedEmail });

    // Save new OTP
    await Otp.create({ email: normalizedEmail, otp: otpCode });

    // Send Email
    await sendOtpEmail(normalizedEmail, otpCode);

    res.json({
      success: true,
      message: 'OTP sent successfully to your email',
    });
  } catch (error) {
    console.error('Send OTP Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending OTP. Please try again.',
    });
  }
});

/**
 * @route   POST /api/student/verify-otp
 * @desc    Verify OTP and login
 * @access  Public
 */
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ success: false, message: 'Email and OTP are required' });

    const normalizedEmail = email.toLowerCase().trim();

    // Find the OTP record
    const otpRecord = await Otp.findOne({ email: normalizedEmail, otp });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP',
      });
    }

    // Delete OTP after successful verification
    await Otp.deleteOne({ _id: otpRecord._id });

    // Generate JWT
    const token = jwt.sign(
      { email: normalizedEmail, role: 'student' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' } // Keep them logged in for 7 days
    );

    res.json({
      success: true,
      token,
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Verify OTP Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying OTP',
    });
  }
});

/**
 * @route   GET /api/student/dashboard
 * @desc    Get all certificates/internships for logged in student
 * @access  Private (Student)
 */
router.get('/dashboard', protectStudent, async (req, res) => {
  try {
    const internships = await Internship.find({ email: req.studentEmail, certificateIssued: true });
    
    // Also fetch non-issued ones if we want them to see progress? Let's just return all, or just issued.
    // The user wants them to download certificates. Let's return issued ones only for now, or all so they see status.
    const allInternships = await Internship.find({ email: req.studentEmail });

    res.json({
      success: true,
      data: allInternships.map(i => ({
        ...i.toObject(),
        issuedBy: 'Graxion Technologies'
      })),
    });
  } catch (error) {
    console.error('Dashboard Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data',
    });
  }
});

export default router;
