let startGame = confirm(`Do you want to play a game?`);
let totalPrize = 0,
    currentRound = 1;

while ( currentRound > 0 ) {

    currentRound === 1 ? totalPrize = 0 : '';

    if ( startGame ) {
        let prizeMultiplier = currentRound - 1,
            diapasonValue = currentRound * 5,
            possiblePrize = 100 * Math.pow(2, prizeMultiplier),
            randomNumber = Math.round((Math.random() * diapasonValue)),
            isGuessed = false;
        const attempts = 3;

        for ( let i = 0; i < attempts; i++, possiblePrize /= 2 ) {
            let userAnswer = prompt(
            'Choose a roulete pocket number from 0 to ' + diapasonValue + 
            '\nAttempts left: ' + (attempts - i) +
            '\nTotal prize: ' + totalPrize + 
            '\nPossible prize on current attempt: ' + possiblePrize);

            if ( parseInt(userAnswer) === randomNumber ) {
                totalPrize += possiblePrize;
                isGuessed = true;
            }
        }

        if ( isGuessed ) {
            alert(`Congratulation, you won! Your prize is: ${totalPrize}.`);
            startGame = confirm(`Do you want to continue?`);
            
            if ( startGame ) {
                currentRound++;
            } else {
                alert(`Thank you for your participation. Your prize is: ${totalPrize}`);
                startGame = confirm(`Do you want to play again?`);
                startGame ? currentRound = 1 : currentRound = 0;
            }
        } else {
            alert(`Thank you for your participation. Your prize is: ${totalPrize}`);
            startGame = confirm(`Do you want to play again?`);
            startGame ? currentRound = 1 : currentRound = 0;
        }
    } else {
        alert(`You did not become a billionaire, but can`);
        currentRound = 0;
    }
}