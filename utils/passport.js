const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const prisma = require("./prisma");
const bcryptjs = require("bcryptjs");

const customFields = {
    usernameField: "username",
    passwordField: "pasword",
};

const localVerifyCallback = async (username, password, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: { username },
        });
        if (!user)
            return done(null, false, {
                message: "Username or pasword is incorrect",
            });

        const valid = await bcryptjs.compare(password, user.password);
        if (!valid)
            return done(null, false, {
                message: "Username or pasword is incorrect",
            });

        return done(null, user);
    } catch (err) {
        done(err);
    }
};

const localStrategy = new LocalStrategy(customFields, localVerifyCallback);
passport.use(localStrategy);
