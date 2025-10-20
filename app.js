const express = require("express");
const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const path = require("node:path");
const flash = require("connect-flash");
const passport = require("passport");
const prisma = require("./utils/prisma");
require("dotenv").config();
require("./utils/passport");

const homeRouter = require("./routes/home");
const documentsRouter = require("./routes/documents");
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const forgotPasswordRouter = require("./routes/forgotPassword");
const errorHandler = require("./controller/errorHandler");
const isAuth = require("./utils/checkAuth");

const PORT = process.env.PORT || 8000;
const app = express();

// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(
    expressSession({
        store: new PrismaSessionStore(prisma, {
            checkPeriod: 2 * 60 * 1000,
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }),
        secret: process.env.COOKIE_SECRET,
        resave: false, // ✅ better performance
        saveUninitialized: false,
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        },
    })
);

// Auth + Flash
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
app.use("/forgot-password", forgotPasswordRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/signup", signupRouter);
app.use("/documents", isAuth, documentsRouter);
app.use("/", isAuth, homeRouter);

// Error handler
app.use(errorHandler);

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server running at port ${PORT}`);
});
