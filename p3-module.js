const coinValues = [1, 5, 10, 25, 50, 100];

module.exports = {
    coinCount
}

function validDenomination(coin){
    let cv = coinValues.indexOf(coin.denom) != -1 ? true : false;
    return cv;
}

function valueFromCoinObject(obj){
    const {denom = 0, count = 0} = obj;
    return denom * count;
}

function valueFromArray(arr){
    let value = arr.reduce((total, num) => total + valueFromCoinObject(num), 0);
    return value;
}

function coinCount(...coinage){
    return valueFromArray(coinage);
}


console.log("{}", coinCount({denom: 5, count: 3}));
console.log("{}s", coinCount({denom: 5, count: 3},{denom: 10, count: 2}));
const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
console.log("...[{}]", coinCount(...coins));
console.log("[{}]", coinCount(coins)); 
