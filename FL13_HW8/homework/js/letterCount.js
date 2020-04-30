const letterCount = (word, letter) => {
    let ctr = 0;

    [...word].forEach((element) => { 
        element === letter ? ctr++ : '';
    });
    return ctr;
};

letterCount('Hawaii maui waui', 'i');