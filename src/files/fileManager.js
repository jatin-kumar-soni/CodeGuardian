const fs = require("fs/promises");

async function createFile(path, content) {
    await fs.writeFile(path, content);
}

async function readFile(path) {
    return await fs.readFile(path, "utf-8");
}

async function updateFile(path, content) {
    await fs.writeFile(path, content);
}

async function deleteFile(path) {
    await fs.unlink(path);
}

module.exports = {
    createFile,
    readFile,
    updateFile,
    deleteFile
};