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
    }).select(
      'studentName studentId internshipTitle domain startDate endDate duration ' +
      'certificateId certificateIssuedDate status type performanceRating mentor'
    );

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
        studentName: internship.studentName,
        studentId: internship.studentId,
        internshipTitle: internship.internshipTitle,
        domain: internship.domain,
        startDate: internship.startDate,
        endDate: internship.endDate,
        duration: internship.formattedDuration,
        certificateId: internship.certificateId,
        certificateIssuedDate: internship.certificateIssuedDate,
        type: internship.type,
        performanceRating: internship.performanceRating,
        mentor: internship.mentor,
        issuedBy: 'Graxion Technologies',
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
    }).select(
      'studentName studentId internshipTitle domain startDate endDate duration ' +
      'certificateId certificateIssuedDate status type performanceRating mentor'
    );

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
        studentName: i.studentName,
        studentId: i.studentId,
        internshipTitle: i.internshipTitle,
        domain: i.domain,
        startDate: i.startDate,
        endDate: i.endDate,
        duration: i.formattedDuration,
        certificateId: i.certificateId,
        certificateIssuedDate: i.certificateIssuedDate,
        type: i.type,
        performanceRating: i.performanceRating,
        mentor: i.mentor,
        issuedBy: 'Graxion Technologies',
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
