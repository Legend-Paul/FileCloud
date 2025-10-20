const nodemailer = require("nodemailer");
const prisma = require("../utils/prisma");
require("dotenv").config();
const path = require("path");

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL, // e.g. your Ethereal or Gmail
        pass: process.env.PASSWORD,
    },
});

async function shareHandler(req, res) {
    try {
        const { email, shareTime } = req.body; // Expect email + filePath in body

        // You can also get file path from req.file if uploaded with Multer:
        // const filePath = req.file?.path;

        if (!email || !filePath) {
            return res
                .status(400)
                .json({ error: "Email and file path are required." });
        }

        // Prepare and send email
        const info = await transporter.sendMail({
            from: `"File Share" <${process.env.EMAIL}>`,
            to: email,
            subject: "Here’s the file you requested",
            text: "Please find the attached file below.",
            html: "<b>Please find the attached file below.</b>",
            attachments: [
                {
                    filename: path.basename(filePath),
                    path: filePath, // e.g. 'uploads/cv-1760862576088.pdf'
                },
            ],
        });

        console.log("✅ Message sent:", info.messageId);
        res.json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        console.error("❌ Error sending email:", error);
        res.status(500).json({ error: "Failed to send email." });
    }
}

module.exports = shareHandler;
