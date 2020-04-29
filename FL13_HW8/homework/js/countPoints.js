const isBigger = (a, b) => a > b;

const countPoints = (arrayOfMatches) => {
    let total = 0;

    arrayOfMatches.forEach(score => {
        let eachTeamScore = score.split(':');
        let x = eachTeamScore[0],
            y = eachTeamScore[1];

        if (isBigger(x, y)) {
            total += 3;
        } else if (x === y) {
            total += 1;
        }
    });
    return total;
}

countPoints(['3:1', '1:0', '0:0', '1:2', '4:0', '2:3', '1:1', '0:1', '2:1', '1:0']);