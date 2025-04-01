import nodemailer from "nodemailer";

export const sendResetEmail = async (email, resetCode) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "noreply@hrmg.com",
    to: email,
    subject: "Password Reset Code",
    text: `Here is your password reset code: ${resetCode}. It will expire in 30 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending reset email");
  }
};
