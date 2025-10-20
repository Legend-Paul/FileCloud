const prisma = require("../utils/prisma");

const viewFileHandler = async (req, res) => {
    try {
        const { id } = req.params;

        const file = await prisma.file.findUnique({
            where: { id },
        });

        if (!file) {
            return res.status(404).send("File not found");
        }
        const fileUrl = `${req.protocol}://${req.get("host")}/${file.url}`;
        const back = req.originalUrl.split("/view/")[0];

        res.render("viewFile", { fileUrl, file, back });
    } catch (err) {
        throw err;
    }
};

module.exports = viewFileHandler;
