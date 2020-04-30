const isBigger = (a, b) => a > b;

const getDifference = (a, b) => {
    let result = a - b;
    !isBigger(a, b) ? result *= (-1) : '';
    return result;
}

getDifference(5, 8);