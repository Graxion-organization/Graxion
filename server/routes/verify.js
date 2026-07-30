import express from 'express';
import Internship from '../models/Internship.js';

const router = express.Router();

/**
 * @route   GET /api/verify/:certificateId
 * @desc    Verify a certificate by certificate ID (public)
 * @access  Public
 */
router.get('/:certificateId', async (req, res) => {
  try {
    const { certificateId } = req.params;

    const internship = await Internship.findOne({
      certificateId: certificateId.toUpperCase(),
      certificateIssued: true,
    });

    if (!internship) {
      return res.status(404).json({
        success: false,
        verified: false,
        message: 'Certificate not found or not yet issued',
      });
    }

    res.json({
      success: true,
      verified: true,
      message: 'Certificate is valid and verified',
      data: {
        ...internship.toObject(),
        issuedBy: 'Graxion',
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
 * @route   POST /api/verify/by-student-id
 * @desc    Verify by student ID (public)
 * @access  Public
 */
router.post('/by-student-id', async (req, res) => {
  try {
    const { studentId } = req.body;

    const internships = await Internship.find({
      studentId: studentId.toUpperCase(),
      certificateIssued: true,
    });

    if (!internships || internships.length === 0) {
      return res.status(404).json({
        success: false,
        verified: false,
        message: 'No certificates found for this Student ID',
      });
    }

    res.json({
      success: true,
      verified: true,
      message: `${internships.length} certificate(s) found`,
      data: internships.map((i) => ({
        ...i.toObject(),
        issuedBy: 'Graxion',
      })),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * @route   POST /api/verify/by-email
 * @desc    Verify and fetch certificates by Email (public)
 * @access  Public
 */
router.post('/by-email', async (req, res) => {
  try {
    const { email } = req.body;

    const internships = await Internship.find({
      email: email.toLowerCase().trim(),
      certificateIssued: true,
    });

    if (!internships || internships.length === 0) {
      return res.status(404).json({
        success: false,
        verified: false,
        message: 'No certificates found for this Email Address',
      });
    }

    res.json({
      success: true,
      verified: true,
      message: `${internships.length} certificate(s) found`,
      data: internships.map((i) => ({
        ...i.toObject(),
        issuedBy: 'Graxion',
      })),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
