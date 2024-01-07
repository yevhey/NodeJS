const arr1 = ['dPRZxomA', '50aoPS1ZOu', 'TPGjTL8l', 'OlzF9pRSP'];
const arr2 = ['0mHXAQJY6', 'mQueU006Is', 'cFM17Eou', 'pFUk0P3Ivo', 'Ob9NtLii', 'Jk8x5DBNxL'];
const searchValue = '50aoPS1ZOu';
const { Worker } = require('node:worker_threads');

function workerFunction() {
    console.log(arr);
}

function findElement(firstArray, secondArray, value) {
    const workerScript1 = `console.log(typeof '${firstArray}')`;
    // const workerScript2 = `const arr = ${secondArray.split(',')}; workerFunction();`;
    const worker1 = new Worker(workerScript1, {eval: true});
    // const worker2 = new Worker(workerScript2, {eval: true});
}

findElement(arr1, arr2, searchValue);