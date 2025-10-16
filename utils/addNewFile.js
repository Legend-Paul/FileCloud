const prisma = require("../utils/prisma");

async function addNewFile(fileType, uploadedFiles, ownerId) {
    const folder = await prisma.folder.findFirst({
        where: {
            name: fileType,
        },
    });

    const files = uploadedFiles.map((file) => {
        const mimeType = file.mimetype.split("/").at(-1);

        return {
            name: file.originalname + "-" + Date.now(),
            mimeType,
            url: file.path,
            size: file.size,
            ownerId,
            folderId: folder.id,
        };
    });
    await prisma.file.createMany({
        data: files,
    });
}

module.exports = addNewFile;
