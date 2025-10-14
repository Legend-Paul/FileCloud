const express = require("express");
const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const path = require("node:path");
const homeRouter = require("./routes/home");
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const forgotPasswordRouter = require("./routes/forgotPassword");
const errorHandler = require("./controller/errorHandler");
const prisma = require("./utils/prisma");
const passport = require("passport");

require("dotenv").config();
require("./utils/passport");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(
    expressSession({
        store: new PrismaSessionStore(prisma, {
            checkPeriod: 2 * 60 * 1000,
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }),
        secret: process.env.COOKIE_SECRET,
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000, // one day
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/forgot-password", forgotPasswordRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/", homeRouter);
app.use(errorHandler);

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log("Server running at port", PORT);
});
