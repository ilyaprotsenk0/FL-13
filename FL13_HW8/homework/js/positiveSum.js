const positiveSum = (array) => {
    let result = array.filter(element => element > 0)
                      .reduce((previousValue, currentValue) => previousValue + currentValue);
    return result;
}

positiveSum([0, -3, 5, 7]);