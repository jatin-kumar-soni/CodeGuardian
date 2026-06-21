🛡️ CodeGuardian

Developer Workspace Inspector

CodeGuardian is a Node.js-based workspace monitoring and file management platform designed to help developers inspect their environment, analyze project structure, monitor system information, and perform CRUD operations on code files through an interactive dashboard.

⸻

🚀 Features

🔍 System Monitoring

* Hostname Detection
* Platform Information
* CPU Core Monitoring
* Node.js Version Detection
* Memory Usage Monitoring
* Home Directory Detection
* Uptime Tracking

📁 File Management

Perform CRUD operations directly from the dashboard:

* Create Files
* Read Files
* Update Files
* Delete Files

📊 Workspace Analysis

* Total Files Count
* Total Folders Count
* JavaScript Files Count
* Project Health Score

📄 Report Generation

Generate a JSON report containing:

* System Information
* Workspace Statistics
* Project Overview

⸻

🏗️ Project Architecture

Frontend (HTML/CSS/JS)
        │
        ▼
Express Server (Node.js)
        │
 ┌──────┼──────┐
 ▼      ▼      ▼
System  CRUD  Scanner
Info    APIs  Module

⸻

📂 Project Structure

CodeGuardian
│
├── public
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── src
│   ├── server.js
│   │
│   ├── system
│   │   └── systemInfo.js
│   │
│   ├── analyzer
│   │   └── envAnalyzer.js
│   │
│   └── files
│       ├── scanner.js
│       └── fileManager.js
│
├── reports
│   └── report.json
│
├── screenshots
│
└── README.md

⸻

⚙️ Code Flow & Strategy

Step 1 — System Information Collection

The application gathers information using Node.js OS module.

Collected Information:

* Hostname
* Platform
* Architecture
* OS Type
* Release Version
* CPU Details
* Memory Information
* Home Directory
* System Uptime

⸻

Step 2 — Workspace Analysis

The scanner module recursively traverses project directories and calculates:

* Total Files
* Total Folders
* JavaScript Files

These metrics are used to calculate the Project Health Score.

⸻

Step 3 — CRUD Operations

The File Manager module performs:

* File Creation
* File Reading
* File Updating
* File Deletion

using Node.js File System Promises API.

⸻

Step 4 — Dashboard Rendering

Frontend fetches data from backend APIs:

/system
/env
/scan
/crud/create
/crud/read
/crud/update
/crud/delete
/generate-report

and updates the UI dynamically.

⸻

📸 Dashboard Overview

The main dashboard provides:

* System Monitoring Cards
* Project Health Gauge
* Workspace Statistics

⸻

📸 File Manager

The File Manager allows users to:

* Create Files
* Read Files
* Update Files
* Delete Files

through an intuitive interface.

⸻

📸 Detailed System Information

Displays detailed information about:

* CPU Model
* Memory Usage
* Operating System
* Architecture
* Node.js Runtime

⸻

📸 Activity Timeline

Tracks every action performed within the dashboard including:

* File Creation
* File Updates
* File Reads
* File Deletions
* Report Generation

⸻

🛠️ Installation

git clone <repository-url>
cd CodeGuardian
npm install

⸻

▶️ Run Application

node src/server.js

Open:

http://localhost:3000

⸻

📡 API Endpoints

Method	Endpoint	Description
GET	/system	System Information
GET	/env	Environment Information
GET	/scan	Workspace Analysis
POST	/crud/create	Create File
GET	/crud/read	Read File
PUT	/crud/update	Update File
DELETE	/crud/delete	Delete File
GET	/generate-report	Generate JSON Report

⸻

🧪 Technologies Used

* Node.js
* Express.js
* HTML5
* CSS3
* JavaScript (ES6)
* File System API
* OS Module

⸻

🎯 Hackathon Highlights

✅ Interactive Dashboard

✅ Workspace Monitoring

✅ System Inspection

✅ CRUD File Operations

✅ Report Generation

✅ Real-Time Updates

✅ Modern Responsive UI

⸻

👨‍💻 Author

Jatin Kumar Soni

MCA | MIT Manipal

CodeGuardian Hackathon Project