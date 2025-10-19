const viewFileHandler = async (req, res) => {
    try {
        //     const fileUrl = `${req.protocol}://
        // ${req.get("host")}/uploads/
        // ${req.file.filename}`;
        res.render("viewFile");
    } catch (err) {
        throw err;
    }
};

module.exports = viewFileHandler;
