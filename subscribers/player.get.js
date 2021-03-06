const assert = require('assert');


module.exports = (kojo, logger) => {

    const tasu = kojo.get('tasu');
    const mongo = kojo.get('mongo');
    const config = kojo.get('config');

    tasu.listen('player.get', async ({id}) => {

        assert(id, 'id is not defined');
        logger.debug(id);
        const index = mongo.db(config.databases.players).collection('index');
        return await index.findOne({id});
    });
};
