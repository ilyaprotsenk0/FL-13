const letterCount = (word, letter) => {
    let charArr = [...word], 
        ctr = 0;

    charArr.forEach((el) => {
        el === letter ? ctr++ : '';
    });
    
    return ctr;
};

letterCount('Sobaka est myaso', 'a');