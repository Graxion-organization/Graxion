import crypto from 'crypto';

/**
 * Generates a unique certificate ID
 * Format: GRX-INT-{YEAR}-{6-char-hex}
 * Example: GRX-INT-2026-A7F3B2
 */
export function generateCertificateId() {
  const year = new Date().getFullYear();
  const random = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `GRX-INT-${year}-${random}`;
}

/**
 * Generates a unique student enrollment ID
 * Format: GRX-STD-{6-char-hex}
 * Example: GRX-STD-B2C1A7
 */
export function generateStudentId() {
  const random = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `GRX-STD-${random}`;
}
