const assert = require('assert');


module.exports = (kojo, logger) => {

    const tasu = kojo.get('tasu');
    const mongo = kojo.get('mongo');
    const config = kojo.get('config');

    tasu.listen('acl.can', async ([principal, action, resource]) => {

        assert(principal, 'principal is not defined');
        assert(action, 'action is not defined');
        assert(resource, 'resource is not defined');
        logger.debug(principal, action, resource);
        const index = mongo.db(config.databases.acl).collection('index');
        return !!await index.findOne({_id: `${principal}::${action}::${resource}`});
    });
};
