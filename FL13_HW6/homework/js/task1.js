const MAX_PERCENT = 100;

let checkNumber = prompt(`Enter check number please`), 
    tipPercent = prompt(`Enter tip percentage`);

checkNumber = parseInt(checkNumber);
tipPercent = parseInt(tipPercent);

if (isNaN(checkNumber) || isNaN(tipPercent)) {
    alert(`Invalid input data`);
} else if (checkNumber < 0 || (tipPercent < 0 || tipPercent > MAX_PERCENT)) {
    alert(`Invalid input data`);
} else {
    const tipAmount = checkNumber * (tipPercent / MAX_PERCENT),
          totalSum = checkNumber + tipAmount;
    alert(`Check number: ${checkNumber}\nTip: ${tipPercent}\nTip amount: ${tipAmount}\nTotal sum to pay: ${totalSum}`);
}