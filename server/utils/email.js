import nodemailer from 'nodemailer';

// Create a transporter using environment variables. 
// If they are not set, it will fail gracefully (or you can use dummy for testing).
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export const sendOtpEmail = async (email, otp) => {
  // Always log OTP to console for testing/development if no SMTP is configured yet
  console.log(`\n========================================`);
  console.log(`[TESTING] OTP for ${email}: ${otp}`);
  console.log(`========================================\n`);

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('No SMTP credentials found in .env. Skipping real email send.');
    return true; // Pretend it succeeded
  }

  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Graxion" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Your Graxion Student Portal Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #ea580c; text-align: center;">GRAXION</h2>
          <p>Hello,</p>
          <p>You requested to log into the Student Portal. Please use the following One-Time Password (OTP) to verify your email address:</p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; text-align: center; margin: 20px 0;">
            <h1 style="margin: 0; letter-spacing: 5px; color: #111;">${otp}</h1>
          </div>
          <p style="color: #666; font-size: 12px;">This OTP is valid for 10 minutes. If you did not request this, please ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email. Please contact support.');
  }
};
