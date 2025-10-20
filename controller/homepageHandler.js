const prisma = require("../utils/prisma");

const homepageHandler = async (req, res) => {
    try {
        const files = await prisma.file.findMany({
            where: {
                owner: req.user,
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 10,
        });
        res.render("home", { files });
    } catch (err) {
        throw err;
    }
};

module.exports = homepageHandler;
