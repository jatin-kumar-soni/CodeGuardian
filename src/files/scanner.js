const fs = require("fs");
const path = require("path");

function scanDirectory(dir) {

    let result = {
        totalFiles: 0,
        totalFolders: 0,
        jsFiles: 0
    };

    function walk(current) {

        const files = fs.readdirSync(current);

        for (const file of files) {

            const fullPath = path.join(
                current,
                file
            );

            const stats =
                fs.statSync(fullPath);

            if (stats.isDirectory()) {

                result.totalFolders++;
                walk(fullPath);

            } else {

                result.totalFiles++;

                if (
                    fullPath.endsWith(".js")
                ) {
                    result.jsFiles++;
                }
            }
        }
    }

    walk(dir);

    return result;
}

module.exports = scanDirectory;