let inputWord = prompt('Enter any word'),
    middleChar = '';

const wordMidpoint = (inputWord.length - 1) / 2;
    
if (inputWord.trim('') !== '') {

    if (inputWord.length % 2 !== 0) {
        middleChar = inputWord[wordMidpoint];
    } else {
        middleChar += inputWord[Math.round(wordMidpoint - 1)];
        middleChar += inputWord[Math.round(wordMidpoint)];
    }
    alert(middleChar);

} else {
    alert('Invalid value');
}