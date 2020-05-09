function Fighter(fighterProps) {
    fighterProps.maxHP = fighterProps.hp;
    fighterProps.wins = 0; 
    fighterProps.losses = 0;

    return {
        getName: () => fighterProps.name,
        getDamage: () => fighterProps.damage,
        getStrength: () => fighterProps.strength,
        getAgility: () => fighterProps.agility,
        getHealth: () => fighterProps.hp,
        dealDamage: damage => {
            if ( fighterProps.hp - damage >= 0 ) {
                fighterProps.hp -= damage
            } else {
                fighterProps.hp = 0;
            }
        },
        heal : value => {
            if ( fighterProps.hp + value > fighterProps.maxHP ) {
                fighterProps.hp = fighterProps.maxHP;
            } else {
                fighterProps.hp += value;
            }
        },
        attack: defender => {
            const MAX_PROB = 100;
            let attackSuccess = 1 - (fighterProps.strength + fighterProps.agility) / MAX_PROB;
            if ( attackSuccess > Math.random() ) {
                defender.dealDamage(fighterProps.damage);
                console.log(`${fighterProps.name} makes ${fighterProps.damage} to ${defender.getName()}`);
            } else {
                console.log(`${fighterProps.name} attack missed`);
            }
        },
        addWin: () => {
            fighterProps.wins++
        },
        addLoss: () => {
            fighterProps.losses++
        },
        logCombatHistory: () => { 
            console.log(`Name: ${fighterProps.name}, Wins: ${fighterProps.wins}, Losses: ${fighterProps.losses}`);
        }
    }
}

const battle = (fighter1, fighter2) => {
    if ( fighter1.getHealth() === 0 || fighter2.getHealth() === 0 ) {
        if ( fighter1.getHealth() === 0 ) {
            console.log(`${fighter1.getName()} is dead and can't fight.`);
            return;
        } else {
            console.log(`${fighter2.getName()} is dead and can't fight.`);
            return;
        }
    }

    while ( fighter1.getHealth() > 0 && fighter2.getHealth() > 0 ) {
        fighter1.attack(fighter2);
        if (fighter2.getHealth() > 0) {
            fighter2.attack(fighter1);
            if (fighter1.getHealth() === 0) {
                fighter2.addWin();
                fighter1.addLoss();
                console.log(`${fighter2.getName()} has won!`);
            }
        } else {
            fighter1.addWin();
            fighter2.addLoss();
            console.log(`${fighter1.getName()} has won!`);
        }
    } 
}

let conor = new Fighter({name: 'Conor', damage: 25, hp: 100, strength: 30, agility: 25});
let khabib = new Fighter({name: 'Khabib', damage: 25, hp: 100, strength: 30, agility: 25});

battle(conor, khabib);