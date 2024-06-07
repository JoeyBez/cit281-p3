const fs = require('fs');
const fastify = require("fastify")();

const {coinCount} = require('./p3-module.js');

fastify.get("/", (request, reply) => {
    const file = fs.readFileSync(`${__dirname}/index.html`, 'utf-8', (err, data) => {
        if(err) {
            console.log(err);
            reply
            .code(500)
            .header("Content-Type", "text/text; charset=utf-8")
            .send("error occured");
        }
    });

    reply
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    .send(file);
});

fastify.get("/coin", (request, reply) => {

    const {denom = 0, count = 0} = request.query;
    const coinValue = coinCount({denom: denom, count: count});

    reply
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    .send(`<h2>Value of ${parseInt(count)} of ${parseInt(denom)} is ${coinValue}</h2><br /><a href="/">Home</a>`);
});

fastify.get("/coins", (request, reply) => {

    const {option} = (request.query);
    let coinValue;
    switch (parseInt(option)){
        case 1:
            coinValue = coinCount({denom: 5, count: 3},{denom: 10, count: 2});
            break;
        case 2:
            const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
            coinValue = coinCount(...coins);
            break;
        default:
            coinValue = 0;
    }

    reply
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    .send(`<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`);
});

const listenIP = 'localhost';
const listenPort = 808;
fastify.listen(listenPort, listenIP, (err, address) => {
    if (err) {
        // fastify.log.error(err);
        console.log(err);
        process.exit(1);
    }
    // fastify.log.info(`Server listening on ${address}`);
    console.log(`Server listening on ${address}`);
});
