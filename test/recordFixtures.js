const {playerOne} = require('./fixtures');


module.exports = async (mongo, config) => {

    const index = mongo.db(config.databases.players).collection('index');
    await index.insertOne(playerOne);
};
