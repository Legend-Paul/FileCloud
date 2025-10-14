const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const prisma = require("./prisma");
const bcryptjs = require("bcryptjs");

const customFields = {
    usernameField: "username",
    passwordField: "password",
};

const localVerifyCallback = async (username, password, done) => {
    try {
        // Find user by username
        const user = await prisma.user.findUnique({
            where: { username },
        });
        console.log(username);

        if (!user) {
            return done(null, false, {
                message: "Username or password is incorrect",
            });
        }

        // Compare hashed passwords
        const valid = await bcryptjs.compare(password, user.password);
        console.log(valid);
        if (!valid) {
            return done(null, false, {
                message: "Username or password is incorrect",
            });
        }

        // Success
        return done(null, user);
    } catch (err) {
        return done(err);
    }
};

const localStrategy = new LocalStrategy(customFields, localVerifyCallback);
passport.use(localStrategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        done(null, user);
    } catch (err) {
        done(err);
    }
});
