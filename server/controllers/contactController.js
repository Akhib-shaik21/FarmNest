const nodemailer = require('nodemailer'); // For email notification

// Configure Nodemailer to send to an admin email (using your existing email setup)
const transporter = nodemailer.createTransport({
  service: process.env.OTP_EMAIL_SERVICE, // e.g., 'gmail'
  auth: {
    user: process.env.OTP_EMAIL_USER,
    pass: process.env.OTP_EMAIL_PASS,
  },
});

// @desc    Handle contact form submission
// @route   POST /api/contact
const submitContactForm = async (req, res, next) => {
  const { name, email, subject, message } = req.body;
  const adminEmailAddress = process.env.OTP_EMAIL_USER; // Your admin email (same as OTP_EMAIL_USER)

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please fill in all required fields (Name, Email, Message).' });
  }

  // Prepare email content
  const emailSubject = `AgriShop Contact Form: ${subject || 'No Subject'}`;
  const emailBody = `
    <h2>New Contact Message from AgriShop Website</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
    <br>
    <p>---</p>
    <p>This message was sent from your AgriShop contact form.</p>
  `;

  try {
    // Send the contact form message as an email to your admin email address
    if (adminEmailAddress) {
      await transporter.sendMail({
        from: process.env.SENDER_EMAIL || process.env.OTP_EMAIL_USER, // Your verified sender email
        to: adminEmailAddress, // Your admin email
        subject: emailSubject,
        html: emailBody,
      });
      console.log('Contact form email sent successfully!');
    } else {
      console.warn('Admin email address not set in .env. Contact form email not sent.');
    }

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    // Ensure error message is a string for frontend
    next(new Error(error.message || 'Failed to send message. Please try again later.'));
  }
};

module.exports = { submitContactForm };