const arr1 = ['dPRZxomA', '50aoPS1ZOu', 'TPGjTL8l', 'OlzF9pRSP'];
const arr2 = ['0mHXAQJY6', 'mQueU006Is', 'cFM17Eou', 'pFUk0P3Ivo', 'Ob9NtLii', 'Jk8x5DBNxL'];
const searchValue = '50aoPS1ZOu';

const { Worker, MessageChannel } = require('node:worker_threads');
const { port1, port2 } = new MessageChannel();
const worker1 = new Worker(
    __filename,
    {
        workerData: {
            someString: 'be ready!',
            postPort: port1,
        },
        transferList: [port1],
    },
);
const worker2 = new Worker(
    './worker2.js',
    {
        workerData: {
            listenPort: port2,
        },
        transferList: [port2],
    },
);

worker1.postMessage('start');

[worker1, worker2].forEach((worker) => {
    worker.on('message', (message) => {
        if(message === 'Finished') {
            worker.terminate();
        }
    })
});

function workerFunction() {
    const foundIndex = arr.findIndex(element => element === value);

    if (foundIndex !== -1) {
        console.log(`Element found at index ${foundIndex} of array ${arrayNumber}`);
    } else {
        console.log('Element not found');
    }
}

function findElement(firstArray, secondArray, value) {
    const workerScript1 = `const arrayNumber = 1; const value = '${value}'; const arr = '${firstArray}'.split(','); ${workerFunction} workerFunction();`;
    const workerScript2 = `const arrayNumber = 2; const value = '${value}'; const arr = '${secondArray}'.split(','); ${workerFunction} workerFunction();`;
    const worker1 = new Worker(workerScript1, { eval: true });
    const worker2 = new Worker(workerScript2, { eval: true });
}