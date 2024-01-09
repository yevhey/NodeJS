const { Worker, workerData } = require('node:worker_threads');

let w = `
const { exec } = require('node:child_process');
const { workerData } = require('node:worker_threads');
    const fileName = workerData;
    console.log(fileName);
exec('cat ' + fileName, (error, stdout, stderr) => {
      console.log(stdout);
    });
    `;
function listFiles(fileName) {
    const worker = new Worker(w, { eval: true, workerData: fileName });
}

 listFiles('app.js');
