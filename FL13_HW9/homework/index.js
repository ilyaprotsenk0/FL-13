const convert = (...args) => {
    let argsArr = [...args];
    for (let i = 0; i < argsArr.length; i++) {
        typeof argsArr[i] === 'string' ? argsArr[i] = parseInt(argsArr[i]) : argsArr[i] = '' + argsArr[i];
    }
    return argsArr;
}

console.log(convert('1', 2, '3'));

const executeforEach = (arr, callback) => {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i]);
    }
}

executeforEach([1, 2, 3], el => console.log(el * 2));

const mapArray = (arr, callback) => {
    let mapped = [];
    executeforEach(arr, el => mapped.push(callback(el)));
    return mapped;
}

console.log(mapArray([1, 3, 5], el => el + 3));

const filterArray = (arr, callback) => {
    let filtered = [];
    executeforEach(arr, el => callback(el) ? filtered.push(el) : '');
    return filtered;
}

console.log(filterArray([2, 5, 8], el => el % 2 === 0));

const containValue = (arr, value) => {
    let contains = false;
    executeforEach(arr, function (el) {
        el === value ? contains = true : '';
    });
    return contains;
};

console.log(containValue([12, 4, 5], 6));

function flipOver(str) {
    let reverseStr = '';
    for (let i = 1; i < str.length + 1; i++) {
        reverseStr += str[str.length - i];
    }
    return reverseStr;
}

console.log(flipOver('собака'));