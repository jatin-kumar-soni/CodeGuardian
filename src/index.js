const fs = require("fs");

const getSystemInfo =
require("./system/systemInfo");

const analyzeEnv =
require("./analyzer/envAnalyzer");

const scanDirectory =
require("./files/scanner");

const analyzeCode =
require("./analyzer/codeAnalyzer");

const {
    createFile,
    readFile,
    updateFile,
    deleteFile
}
=
require("./files/fileManager");

async function main() {

    console.log(
        "\n===== SYSTEM INFO =====\n"
    );

    console.log(
        getSystemInfo()
    );

    console.log(
        "\n===== ENVIRONMENT =====\n"
    );

    console.log(
        analyzeEnv()
    );

    console.log(
        "\n===== WORKSPACE SCAN =====\n"
    );

    console.log(
        scanDirectory(".")
    );

    console.log(
        "\n===== CRUD DEMO =====\n"
    );

    await createFile(
        "sample.js",
        "console.log('Hello');"
    );

    console.log(
        await readFile(
            "sample.js"
        )
    );

    await updateFile(
        "sample.js",
        "console.log('Updated');"
    );

    console.log(
        await readFile(
            "sample.js"
        )
    );

    await deleteFile(
        "sample.js"
    );

    console.log(
        "\n===== CODE ANALYSIS =====\n"
    );

    const report =
        analyzeCode(
            __filename
        );

    console.log(report);

    fs.writeFileSync(
        "./reports/system-report.json",
        JSON.stringify(
            getSystemInfo(),
            null,
            2
        )
    );

    console.log(
        "\nReport Generated!"
    );
}

main();