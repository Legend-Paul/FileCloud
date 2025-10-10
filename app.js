const express = require("express");
const path = require("node:path");
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const forgotPasswordRouter = require("./routes/forgotPassword");

require("dotenv").config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use("/forgot-password", forgotPasswordRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log("Server running at port", PORT);
});
