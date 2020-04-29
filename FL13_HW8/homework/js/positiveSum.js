const positiveSum = (arr) => {
    let result = arr.filter(el => el > 0)
                    .reduce((previousValue, currentValue) => previousValue + currentValue);
    return result;
}

positiveSum([1, 3, -5, 4]);