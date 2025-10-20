const nodemailer = require("nodemailer");
const prisma = require("../utils/prisma");
require("dotenv").config();
const path = require("path");

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

const shareHandler = async (req, res) => {
    const { email } = req.body;
    const { id } = req.params;

    try {
        const itemToSend = await prisma.file.findUnique({
            where: { id },
        });

        if (!email || !itemToSend) {
            return res
                .status(400)
                .json({ error: "Email and file path are required." });
        }

        const filePath = itemToSend.url;

        const info = await transporter.sendMail({
            from: `"File Share" <${process.env.EMAIL}>`,
            to: email,
            subject: "Here’s the file you requested",
            text: "Please find the attached file below.",
            html: "<b>Please find the attached file below.</b>",
            attachments: [
                {
                    filename: path.basename(filePath),
                    path: filePath,
                },
            ],
        });
        // 👇 THIS is the important line — it prints the Ethereal preview link:

        res.render("sentStatus", {
            success: true,
            icon: "✅",
            message: "Email sent successfully!",
        });
    } catch (error) {
        res.render("sentStatus", {
            icon: "❌",
            message: "Email sent successfully!",
        });
    }
};

module.exports = shareHandler;
