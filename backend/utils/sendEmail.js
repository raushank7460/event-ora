const nodemailer = require("nodemailer");

const sendEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Email Verification OTP",
        html: `
            <h2>Your OTP for verification</h2>
            <h1>${otp}</h1>
            <p>This OTP is valid for 10 minutes.</p>
        `,
    });
};

module.exports = sendEmail;
