const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

// Function to send an email
const sendEmail = async (req, res) => {
    const { name, email, message } = req.body;
    console.log("Received body:", req.body)

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Configure email transporter
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,  // Use 465 for SSL or 587 for TLS
            secure: false, // Set to true for port 465
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });


        // Email details
        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: "mk.munga@yahoo.com",
            subject: "New Portfolio Message",
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                    <h2 style="color: #333; text-align: center;">New Portfolio Message</h2>
                    <hr style="border: none; height: 1px; background-color: #ddd;">
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #007bff;">${email}</a></p>
                    <p><strong>Message:</strong></p>
                    <div style="background: #f9f9f9; padding: 10px; border-radius: 5px;">
                        <p style="white-space: pre-wrap; font-size: 25px">${message}</p>
                    </div>
                    <hr style="border: none; height: 1px; background-color: #ddd;">
                    <p style="text-align: center; font-size: 30px; color: #555;">Sent from your portfolio website</p>
                </div>
            `,
        };


        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email.", mes: error.message });
    }
};

module.exports = { sendEmail };
