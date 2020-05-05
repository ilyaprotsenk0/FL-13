const convert = (...args) => {
    let converted = [];
    for (let i = 0; i < [...args].length; i++) {
        typeof [...args][i] === 'string' ? converted.push(parseInt([...args][i])) : converted.push('' + [...args][i]);
    }
    return converted;
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
    executeforEach(arr, el => {
        el === value ? contains = true : '';
    });
    return contains;
};

console.log(containValue([12, 4, 5], 5));

const flipOver = str => {
    let reverseStr = '';
    for (let i = 1; i < str.length + 1; i++) {
        reverseStr += str[str.length - i];
    }
    return reverseStr;
}

console.log(flipOver('собака'));

const makeListFromRange = arr => {
    let list = [];
    for (let i = arr[0]; i < arr[1] + 1; i++) {
        list.push(i);
    }
    return list;
}

console.log(makeListFromRange([1, 5]));

const fruits = [
    { name: 'apple', weight: 0.5 },
    { name: 'pineapple', weight: 2 }
];

const getArrayOfKeys = (arr, key) => {
    let keyArr = [];
    executeforEach(arr, el => {
        keyArr.push(el[key]);
    });
    return keyArr;
}

console.log(getArrayOfKeys(fruits, 'name'));

const UP_LIM = 20, 
      LOW_LIM = 10;
const substitute = arr => mapArray(arr, el => el < UP_LIM && el > LOW_LIM ? '*' : el);

console.log(substitute([58, 14, 48, 12, 31, 19, 10]));

const date = new Date(2020, 0, 2);
const getPastDay = (date, past) => date.getDate(date.setDate(date.getDate() - past));

console.log(getPastDay(date, 365));

const formatDate = date => {
    let year = date.getFullYear(),
        month = date.getMonth(),
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes();

    const zero = p => p < 10 ? '0' + p : p;
    return `${year}/${zero(month)}/${zero(day)} ${zero(hour)}:${zero(minute)}`;
}

console.log(formatDate(new Date()));