const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.OTP_EMAIL_SERVICE, // e.g., 'gmail'
  auth: {
    user: process.env.OTP_EMAIL_USER,
    pass: process.env.OTP_EMAIL_PASS,
  },
});

const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.OTP_EMAIL_USER,
    to: email,
    subject: 'Your Organic Harvest OTP for Verification',
    html: `
      <h2>Hello from Organic Harvest!</h2>
      <p>Thank you for registering. Your One-Time Password (OTP) for account verification is:</p>
      <h3 style="font-size: 24px; color: #4CAF50;">${otp}</h3>
      <p>This OTP is valid for 10 minutes. Do not share this with anyone.</p>
      <p>If you did not request this, please ignore this email.</p>
      <p>Best Regards,</p>
      <p>The Organic Harvest Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP Email sent successfully!');
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Failed to send OTP email');
  }
};

module.exports = { sendOTPEmail };