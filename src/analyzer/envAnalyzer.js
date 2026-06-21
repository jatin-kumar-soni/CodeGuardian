const os = require("os");

function bytesToGB(bytes) {
    return (bytes / 1024 / 1024 / 1024).toFixed(2);
}

function getSystemInfo() {
    return {
        hostname: os.hostname(),
        platform: os.platform(),
        architecture: os.arch(),

        osType: os.type(),
        release: os.release(),

        nodeVersion: process.version,

        cpu: {
            cores: os.cpus().length,
            model: os.cpus()[0].model
        },

        memory: {
            total: bytesToGB(os.totalmem()) + " GB",
            free: bytesToGB(os.freemem()) + " GB"
        },

        homeDirectory: os.homedir(),
        uptime: os.uptime()
    };
}

module.exports = getSystemInfo;