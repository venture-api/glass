const {playerOne, aclOne} = require('./fixtures');


module.exports = async (mongo, config) => {

    console.log('creating player fixtures');
    const players = mongo.db(config.databases.players).collection('index');
    await players.insertOne(playerOne);

    console.log('creating acl fixtures');
    const acl = mongo.db(config.databases.acl).collection('index');
    await acl.insert(aclOne);
};
