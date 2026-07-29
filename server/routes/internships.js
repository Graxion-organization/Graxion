import express from 'express';
import Internship from '../models/Internship.js';
import { protect } from '../middleware/auth.js';
import { generateCertificateId, generateStudentId } from '../utils/generateCertId.js';

const router = express.Router();

/**
 * @route   GET /api/internships
 * @desc    Get all internships with filtering, sorting, pagination
 * @access  Private (Admin)
 */
router.get('/', protect, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      status,
      domain,
      type,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    // Build query
    const query = {};

    if (search) {
      query.$or = [
        { studentName: { $regex: search, $options: 'i' } },
        { studentId: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { certificateId: { $regex: search, $options: 'i' } },
        { internshipTitle: { $regex: search, $options: 'i' } },
      ];
    }

    if (status) query.status = status;
    if (domain) query.domain = domain;
    if (type) query.type = type;

    // Sort
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [internships, total] = await Promise.all([
      Internship.find(query)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .populate('addedBy', 'username'),
      Internship.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: internships,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
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
 * @route   GET /api/internships/stats
 * @desc    Get dashboard statistics
 * @access  Private (Admin)
 */
router.get('/stats', protect, async (req, res) => {
  try {
    const [
      total,
      enrolled,
      ongoing,
      completed,
      certificatesIssued,
      dropped,
      domainStats,
      recentActivity,
    ] = await Promise.all([
      Internship.countDocuments(),
      Internship.countDocuments({ status: 'enrolled' }),
      Internship.countDocuments({ status: 'ongoing' }),
      Internship.countDocuments({ status: { $in: ['completed', 'certificate-issued'] } }),
      Internship.countDocuments({ certificateIssued: true }),
      Internship.countDocuments({ status: 'dropped' }),
      Internship.aggregate([
        { $group: { _id: '$domain', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Internship.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('studentName internshipTitle status createdAt'),
    ]);

    res.json({
      success: true,
      data: {
        total,
        enrolled,
        ongoing,
        completed,
        certificatesIssued,
        dropped,
        domainStats,
        recentActivity,
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
 * @route   GET /api/internships/:id
 * @desc    Get single internship by MongoDB ID
 * @access  Private (Admin)
 */
router.get('/:id', protect, async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id)
      .populate('addedBy', 'username');

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: 'Internship record not found',
      });
    }

    res.json({
      success: true,
      data: internship,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * @route   POST /api/internships
 * @desc    Create new internship record
 * @access  Private (Admin)
 */
router.post('/', protect, async (req, res) => {
  try {
    const data = { ...req.body };

    // Generate student ID if not provided
    if (!data.studentId) {
      data.studentId = generateStudentId();
    }

    // Set addedBy
    data.addedBy = req.admin._id;

    const internship = await Internship.create(data);

    res.status(201).json({
      success: true,
      data: internship,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Student ID or Certificate ID already exists',
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * @route   PUT /api/internships/:id
 * @desc    Update internship record
 * @access  Private (Admin)
 */
router.put('/:id', protect, async (req, res) => {
  try {
    const internship = await Internship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: 'Internship record not found',
      });
    }

    res.json({
      success: true,
      data: internship,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * @route   DELETE /api/internships/:id
 * @desc    Delete internship record
 * @access  Private (Admin)
 */
router.delete('/:id', protect, async (req, res) => {
  try {
    const internship = await Internship.findByIdAndDelete(req.params.id);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: 'Internship record not found',
      });
    }

    res.json({
      success: true,
      message: 'Internship record deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * @route   POST /api/internships/:id/issue-certificate
 * @desc    Issue certificate for an internship
 * @access  Private (Admin)
 */
router.post('/:id/issue-certificate', protect, async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: 'Internship record not found',
      });
    }

    if (internship.certificateIssued) {
      return res.status(400).json({
        success: false,
        message: 'Certificate already issued',
        data: { certificateId: internship.certificateId },
      });
    }

    // Generate certificate ID
    const certificateId = generateCertificateId();

    internship.certificateId = certificateId;
    internship.certificateIssued = true;
    internship.certificateIssuedDate = new Date();
    internship.status = 'certificate-issued';

    await internship.save();

    res.json({
      success: true,
      message: 'Certificate issued successfully',
      data: internship,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * @route   DELETE /api/internships/bulk/delete
 * @desc    Bulk delete internships
 * @access  Private (Admin)
 */
router.post('/bulk/delete', protect, async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an array of IDs to delete',
      });
    }

    const result = await Internship.deleteMany({ _id: { $in: ids } });

    res.json({
      success: true,
      message: `${result.deletedCount} records deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
