const express = require("express");
const path = require("path");
const fs = require("fs");

const getSystemInfo = require("./system/systemInfo");
const analyzeEnv = require("./analyzer/envAnalyzer");
const scanDirectory = require("./files/scanner");

const {
    createFile,
    readFile,
    updateFile,
    deleteFile
} = require("./files/fileManager");

const app = express();
const PORT = 3000;

/* Middleware */

app.use(express.json());

app.use(
    express.static(
        path.join(__dirname, "../public")
    )
);

app.use(
    "/reports",
    express.static(
        path.join(__dirname, "../reports")
    )
);

/* Home */

app.get("/", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "../public/index.html"
        )
    );
});

/* System Info */

app.get("/system", (req, res) => {
    res.json(getSystemInfo());
});

/* Environment Info */

app.get("/env", (req, res) => {
    res.json(analyzeEnv());
});

/* Workspace Scan */

app.get("/scan", (req, res) => {
    res.json(scanDirectory("."));
});

/* Create File */

app.post("/crud/create", async (req, res) => {

    try {

        const { path, content } = req.body;

        await createFile(
            path,
            content || ""
        );

        res.json({
            success: true
        });

    }
    catch(err){

        res.status(500).json({
            error: err.message
        });

    }
});

/* Read File */

app.get("/crud/read", async (req, res) => {

    try {

        const content =
        await readFile(
            req.query.path
        );

        res.json({
            content
        });

    }
    catch(err){

        res.status(500).json({
            error: err.message
        });

    }
});

/* Update File */

app.put("/crud/update", async (req, res) => {

    try {

        const { path, content } =
        req.body;

        await updateFile(
            path,
            content
        );

        res.json({
            success: true
        });

    }
    catch(err){

        res.status(500).json({
            error: err.message
        });

    }
});

/* Delete File */

app.delete("/crud/delete", async (req, res) => {

    try {

        await deleteFile(
            req.body.path
        );

        res.json({
            success: true
        });

    }
    catch(err){

        res.status(500).json({
            error: err.message
        });

    }
});

/* Generate Report */

app.get("/generate-report", (req, res) => {

    try {

        const report = {

            generatedAt:
            new Date(),

            system:
            getSystemInfo(),

            workspace:
            scanDirectory(".")

        };

        const reportsDir =
        path.join(
            __dirname,
            "../reports"
        );

        if(
            !fs.existsSync(
                reportsDir
            )
        ){
            fs.mkdirSync(
                reportsDir,
                {
                    recursive:true
                }
            );
        }

        fs.writeFileSync(

            path.join(
                reportsDir,
                "report.json"
            ),

            JSON.stringify(
                report,
                null,
                2
            )

        );

        res.json({

            success:true,

            report:
            "/reports/report.json"

        });

    }
    catch(err){

        console.error(err);

        res.status(500).json({
            error:
            err.message
        });

    }
});

/* Start Server */

app.listen(PORT, () => {

    console.log(
        `🚀 CodeGuardian running at http://localhost:${PORT}`
    );

});