const Kojo = require('kojo');
const Tasuu = require('tasu');
const {MongoClient} = require('mongodb');
const configLoader = require('yt-config');
const pack = require('./package.json');


module.exports = async () => {

    const config = await configLoader('config.ini');


    // kojo

    const kojo = new Kojo('glass', config.kojo, pack);
    kojo.set('config', config);


    // mongo

    const client = await MongoClient.connect(config.mongodb.url);
    kojo.set('mongo', client);


    // tasu

    const tasu = new Tasuu(config.tasu);
    await tasu.connected();
    kojo.set('tasu', tasu);

    await kojo.ready();
    return kojo;
};
