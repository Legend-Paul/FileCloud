const { body, validationResult } = require("express-validator");
const prisma = require("../utils/prisma");
const bcryptjs = require("bcryptjs");

const forgotPasswordGet = (req, res) => {
    res.render("forgotPassword");
};
const validate = [
    body("username").trim().notEmpty().withMessage("Username is required"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be atleast 8 character long"),
    body("confirmPassword")
        .trim()
        .custom((value, { req }) => value === req.body.password)
        .withMessage("Password must be equal"),
];
const forgotPasswordPost = [
    validate,
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.render("forgotPassword", {
                    error: errors.array()[0].msg,
                });

            const { username, password } = req.body;
            const user = await prisma.user.findUnique({
                where: {
                    username,
                },
            });

            // user doesn't exist
            const hashedPassword = await bcryptjs.hash(password, 10);
            if (!user)
                return res.render("forgotPassword", {
                    error: "Username doesn't exist",
                });

            // update user
            await prisma.user.update({
                where: {
                    username,
                },
                data: {
                    password: hashedPassword,
                },
            });
            res.redirect("/login");
        } catch (err) {
            throw err;
        }
    },
];

module.exports = { forgotPasswordGet, forgotPasswordPost };
