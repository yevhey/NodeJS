const arr1 = ['dPRZxomA', '50aoPS1ZOu', 'TPGjTL8l', 'OlzF9pRSP'];
const arr2 = ['0mHXAQJY6', 'mQueU006Is', 'cFM17Eou', 'pFUk0P3Ivo', 'Ob9NtLii', 'Jk8x5DBNxL'];
const searchValue = '50aoPS1ZOu';

// const searchValue = 'some string for demo';

const { Worker, MessageChannel, isMainThread, workerData, parentPort } = require('node:worker_threads');

function workerFunction() {
    const { arrayNumber, value, arr, listenPort, postPort } = workerData;
    const foundIndex = arr.findIndex(element => element === value);

    postPort.on('message', message => {
        if (message === 'Found') {
            parentPort.postMessage('Finished');
        }
    });

    if (foundIndex !== -1) {
        console.log(`Element found at index ${foundIndex} of array ${arrayNumber}`);
        postPort.postMessage('Found');
    } else {
        console.log('Element not found');
    }

    parentPort.postMessage('Finished');
}

function findElement(firstArray, secondArray, value) {
    const { port1, port2 } = new MessageChannel();

    if (isMainThread) {
        const worker1 = new Worker(__filename, { workerData: { arrayNumber: 1, value, arr: firstArray, postPort: port1 }, transferList: [port1] });
        const worker2 = new Worker(__filename, { workerData: { arrayNumber: 2, value, arr: secondArray, postPort: port2 }, transferList: [port2] });

        [worker1, worker2].forEach((worker) => {
            worker.on('message', (message) => {
                if(message === 'Finished') {
                    worker.terminate();
                }
            }
        )});
    } else {
        workerFunction();
    }
}

findElement(arr1, arr2, searchValue);
// findElement([], [], searchValue);
