const fs = require("fs");

function analyzeCode(filePath) {

    const content =
        fs.readFileSync(
            filePath,
            "utf8"
        );

    const lines =
        content.split("\n").length;

    const functions =
        (content.match(
            /function\s+\w+/g
        ) || []).length;

    const classes =
        (content.match(
            /class\s+\w+/g
        ) || []).length;

    return {
        file: filePath,
        lines,
        functions,
        classes
    };
}

module.exports = analyzeCode;