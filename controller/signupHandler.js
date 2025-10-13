const { body, validationResult } = require("express-validator");

const signupGet = (req, res) => {
    res.render("signup");
};

const validate = [
    body("firstName")
        .trim()
        .notEmpty()
        .withMessage("Firstname is required")
        .isAlpha("en-US", { ignore: " " })
        .withMessage("Firstname must be only letters"),
    body("lastName")
        .trim()
        .notEmpty()
        .withMessage("Lastname is required")
        .isAlpha("en-US", { ignore: " " })
        .withMessage("Lastname must be only letters"),
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

const signupPost = [
    validate,
    (req, res) => {
        const errors = validationResult(req);
        console.log(errors.isEmpty());
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.render("signup", { error: errors.array()[0].msg });
        }
        const { firstName, lastName, username, password } = req.body;
    },
];

module.exports = { signupGet, signupPost };
