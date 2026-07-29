import jwt from 'jsonwebtoken';

/**
 * Protect student routes - verify JWT token
 */
export const protectStudent = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized — no token provided',
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // For students, we just need the email from the payload
    if (!decoded.email || decoded.role !== 'student') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized — invalid token payload',
      });
    }

    req.studentEmail = decoded.email;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized — invalid token',
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized — token expired',
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Server error in student auth middleware',
    });
  }
};
