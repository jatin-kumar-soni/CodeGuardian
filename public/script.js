const output = document.getElementById("output");

/* -------------------------
   Activity Timeline
------------------------- */

function show(data, action = "Action") {

    const div = document.createElement("div");

    div.className = "log";

    div.innerHTML = `
        <strong>
            ${new Date().toLocaleTimeString()}
            - ${action}
        </strong>

        <pre>
${JSON.stringify(data, null, 2)}
        </pre>
    `;

    output.prepend(div);
}

/* -------------------------
   Toast Notification
------------------------- */

function toast(message) {

    const toast = document.createElement("div");

    toast.innerText = message;

    toast.style.position = "fixed";
    toast.style.top = "20px";
    toast.style.right = "20px";
    toast.style.background = "#22c55e";
    toast.style.color = "#fff";
    toast.style.padding = "12px 18px";
    toast.style.borderRadius = "10px";
    toast.style.fontWeight = "bold";
    toast.style.zIndex = "9999";

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

/* -------------------------
   Clear Logs
------------------------- */

function clearLogs() {

    output.innerHTML = `
        <div class="log">
            Logs Cleared
        </div>
    `;

    toast("Logs Cleared");
}

/* -------------------------
   System Information
------------------------- */

async function loadSystemInfo() {

    try {

        const res =
        await fetch("/system");

        const data =
        await res.json();

        document
        .getElementById("hostname")
        .textContent =
        data.hostname || "N/A";

        document
        .getElementById("platform")
        .textContent =
        data.platform || "N/A";

        document
        .getElementById("nodeVersion")
        .textContent =
        data.nodeVersion || "N/A";

        document
        .getElementById("cpu")
        .textContent =
        data.cpu?.cores || "N/A";

    }
    catch(err){

        console.error(err);

        toast(
            "Failed to load system info"
        );

    }
}

/* -------------------------
   Workspace Scan
------------------------- */

async function loadWorkspace() {

    try {

        const res =
        await fetch("/scan");

        const data =
        await res.json();

        document
        .getElementById("files")
        .textContent =
        data.totalFiles;

        document
        .getElementById("folders")
        .textContent =
        data.totalFolders;

        document
        .getElementById("jsfiles")
        .textContent =
        data.jsFiles;

        calculateHealth(data);

    }
    catch(err){

        console.error(err);

        toast(
            "Failed to load workspace"
        );
    }
}

/* -------------------------
   Health Score
------------------------- */

function calculateHealth(data) {

    let score = 100;

    score -= Math.max(
        0,
        10 - Math.min(
            data.totalFolders,
            10
        )
    );

    score -= Math.max(
        0,
        20 - Math.min(
            data.jsFiles,
            20
        )
    );

    score = Math.max(score, 0);

    document
    .getElementById("healthScore")
    .textContent =
    score + "%";

    const circle =
    document.querySelector(".circle");

    if(score >= 90){

        circle.style.background =
        `conic-gradient(
            #22c55e 0% ${score}%,
            #334155 ${score}% 100%
        )`;

    }
    else if(score >= 70){

        circle.style.background =
        `conic-gradient(
            orange 0% ${score}%,
            #334155 ${score}% 100%
        )`;

    }
    else{

        circle.style.background =
        `conic-gradient(
            red 0% ${score}%,
            #334155 ${score}% 100%
        )`;

    }
}

/* -------------------------
   Environment Variables
------------------------- */

async function loadEnv() {

    try {

        const res =
        await fetch("/env");

        const data =
        await res.json();

        let html = `
        <table>
            <tr>
                <th>Variable</th>
                <th>Value</th>
            </tr>
        `;

        const keys =
        Object.keys(data).slice(0, 25);

        for(const key of keys){

            let value = data[key];

            if(key === "cpu"){

                value = `
                    <strong>Model:</strong> ${data.cpu.model}
                    <br>
                    <strong>Cores:</strong> ${data.cpu.cores}
                `;
            }

            else if(key === "memory"){

                value = `
                    <strong>Total:</strong> ${data.memory.total}
                    <br>
                    <strong>Free:</strong> ${data.memory.free}
                `;
            }

            else if(typeof value === "object"){

                value = `
                <pre>
${JSON.stringify(value, null, 2)}
                </pre>
                `;
            }

            html += `
            <tr>
                <td>${key}</td>
                <td>${value}</td>
            </tr>
            `;
        }

        html += "</table>";

        document
        .getElementById("envTable")
        .innerHTML = html;

    }
    catch(err){

        console.error(err);

        show(
            {
                error: err.message
            },
            "Environment Error"
        );
    }
}

/* -------------------------
   Create File
------------------------- */

async function createFile() {

    const path =
    document
    .getElementById("path")
    .value;

    const content =
    document
    .getElementById("content")
    .value;

    if(!path.trim()){

        toast(
            "Please enter file path"
        );

        return;
    }

    try{

        toast("Processing...");

        const res =
        await fetch(
            "/crud/create",
            {
                method:"POST",
                headers:{
                    "Content-Type":
                    "application/json"
                },
                body:JSON.stringify({
                    path,
                    content
                })
            }
        );

        const data =
        await res.json();

        show(
            data,
            "File Created"
        );

        toast(
            "File Created Successfully"
        );

        loadWorkspace();

    }
    catch(err){

        show(
            {error:err.message},
            "Create Error"
        );
    }
}

/* -------------------------
   Read File
------------------------- */

async function readFileData() {

    const path =
    document
    .getElementById("path")
    .value;

    if(!path.trim()){

        toast(
            "Please enter file path"
        );

        return;
    }

    try{

        const res =
        await fetch(
            `/crud/read?path=${path}`
        );

        const data =
        await res.json();

        show(
            data,
            "File Read"
        );

        if(data.content){

            document
            .getElementById("content")
            .value =
            data.content;
        }

        toast(
            "File Loaded"
        );

    }
    catch(err){

        show(
            {error:err.message},
            "Read Error"
        );
    }
}

/* -------------------------
   Update File
------------------------- */

async function updateFileData() {

    const path =
    document
    .getElementById("path")
    .value;

    const content =
    document
    .getElementById("content")
    .value;

    if(!path.trim()){

        toast(
            "Please enter file path"
        );

        return;
    }

    try{

        const res =
        await fetch(
            "/crud/update",
            {
                method:"PUT",
                headers:{
                    "Content-Type":
                    "application/json"
                },
                body:JSON.stringify({
                    path,
                    content
                })
            }
        );

        const data =
        await res.json();

        show(
            data,
            "File Updated"
        );

        toast(
            "File Updated Successfully"
        );

    }
    catch(err){

        show(
            {error:err.message},
            "Update Error"
        );
    }
}

/* -------------------------
   Delete File
------------------------- */

async function deleteFileData() {

    const path =
    document
    .getElementById("path")
    .value;

    if(!path.trim()){

        toast(
            "Please enter file path"
        );

        return;
    }

    try{

        const res =
        await fetch(
            "/crud/delete",
            {
                method:"DELETE",
                headers:{
                    "Content-Type":
                    "application/json"
                },
                body:JSON.stringify({
                    path
                })
            }
        );

        const data =
        await res.json();

        show(
            data,
            "File Deleted"
        );

        toast(
            "File Deleted Successfully"
        );

        loadWorkspace();

    }
    catch(err){

        show(
            {error:err.message},
            "Delete Error"
        );
    }
}

/* -------------------------
   Generate Report
------------------------- */

async function generateReport() {

    try{

        const res =
        await fetch(
            "/generate-report"
        );

        const data =
        await res.json();

        show(
            data,
            "Report Generated"
        );

        toast(
            "Report Generated"
        );

    }
    catch(err){

        show(
            {error:err.message},
            "Report Error"
        );
    }
}

/* -------------------------
   Startup
------------------------- */

show(
    {
        status:
        "Dashboard Ready"
    },
    "Startup"
);

loadSystemInfo();
loadWorkspace();
loadEnv();

/* -------------------------
   Auto Refresh
------------------------- */

setInterval(() => {

    loadSystemInfo();

    loadWorkspace();

},30000);