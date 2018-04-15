const {assert} = require('chai');
const Glass = require('../glass');
const {playerOne} = require('./fixtures');
const recordFixtures = require('./recordFixtures');


let tasu;
let mongo;
let glass;
let config;

describe('glass', () => {

    before(async function ()  {

        glass = await Glass();
        tasu = glass.get('tasu');
        mongo = glass.get('mongo');
        config = glass.get('config');
        await recordFixtures(mongo, config);
    });

    after(async function () {
        console.log('> stopping test glass');
        tasu.close();
        await Promise.all(Object.entries(config.databases).map(([k, name]) => {
            return mongo.db(name).dropDatabase();
        }));
        mongo.close();
    });

    describe('player listeners', () => {

        it('handles player.identify', async () => {

            const {id, email, name} = playerOne;
            const player = await tasu.request('player.identify', {email});
            assert.equal(player.email, email);
            assert.equal(player.name, name);
            assert.equal(player.id, id);
        });

        it('handles player.get', async () => {

            const {id, email, name} = playerOne;
            const player = await tasu.request('player.get', {id});
            assert.equal(player.email, email);
            assert.equal(player.name, name);
            assert.equal(player.id, id);
        })

    });

    describe('acl listeners', () => {

        it('handles acl.can', async () => {
            const canCreate = await tasu.request('acl.can', [playerOne.id, 'create', '/factories']);
            assert.isTrue(canCreate);
            const canBlowUp = await tasu.request('acl.can', [playerOne.id, 'blowUp', '/factories']);
            assert.isFalse(canBlowUp);
        })

    });

});

