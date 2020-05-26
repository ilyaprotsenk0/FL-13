const paymentCard = { cash : '100$' };
const creditCard = { creditLimit: '50$', cash: '200$' };

function assign(empty, obj1, obj2) {
    let obj = empty;
    let cards = [obj1, obj2];
    for (let card of cards) {
        for (let key in card) {
            if (!obj.hasOwnProperty([key])) {
                obj[key] = card[key];
            } else {
                obj[key] = card[key];
            }
        }
    }
    return obj;
}

let universalCard = assign({}, creditCard, paymentCard);