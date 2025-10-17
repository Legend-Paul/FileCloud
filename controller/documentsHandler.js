const files = require("../utils/files");
const prisma = require("../utils/prisma");
const createNewFolder = require("../utils/createNewFolder");

const documentsGet = async (req, res) => {
    try {
        await files.getFiles(req, res, "DOCUMENT");
    } catch (err) {
        throw err;
    }
};

const documentsNewFile = async (req, res) => {
    try {
        await files.addNewFile(req, res, "DOCUMENT");
    } catch (err) {
        throw err;
    }
};

const documentsNewFolder = async (req, res) => {
    try {
        await createNewFolder(req, res, "DOCUMENT");
    } catch (err) {
        throw err;
    }
};

module.exports = { documentsGet, documentsNewFile, documentsNewFolder };
