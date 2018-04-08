const assert = require('assert');


module.exports = (kojo, logger) => {

    const tasu = kojo.get('tasu');
    const mongo = kojo.get('mongo');
    const config = kojo.get('config');

    tasu.listen('player.identify', async ({email}) => {
        assert(email, 'email is not defined');
        logger.debug(email);
        const index = mongo.db(config.databases.players).collection('index');
        return await index.findOne({email});
    });
};
