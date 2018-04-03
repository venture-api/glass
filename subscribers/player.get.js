module.exports = (kojo, logger) => {

    const tasu = kojo.get('tasu');
    const mongo = kojo.get('mongo');

    tasu.listen('player.get', async ({id}) => {
        logger.debug(id);
        return await mongo.db('players').collection('ids').findOne({});
    });
};
