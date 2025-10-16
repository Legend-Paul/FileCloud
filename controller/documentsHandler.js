const addNewFile = require("../utils/addNewFile");

const documentsGet = (req, res) => {
    res.render("home", { path: "/Documents", fileType: "Documents" });
};
const documentsNewFile = async (req, res) => {
    try {
        const { fileType } = req.body;
        const { id } = req.user;
        const uploadedFiles = req.files;

        await addNewFile(fileType, uploadedFiles, id);

        res.redirect("/");
    } catch (err) {
        throw err;
    }
};

module.exports = { documentsGet, documentsNewFile };
