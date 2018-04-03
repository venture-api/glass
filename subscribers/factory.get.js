module.exports = (kojo, logger) => {

    const tasu = kojo.get('tasu');
    const db = kojo.get('db');

    tasu.listen('factory.get', async ({code}, done) => {
        logger.debug(code);
        const ids = db.collection('resource.ids');
        const factory = await ids.insertOne(projectData);
        done();
    });
};
