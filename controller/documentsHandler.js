const prisma = require("../utils/prisma");

const documentsGet = (req, res) => {
    res.render("home", { path: "/Documents", fileType: "Documents" });
};
const documentsNewFile = async (req, res) => {
    res.send("Files uploaded!");
};

module.exports = { documentsGet, documentsNewFile };
