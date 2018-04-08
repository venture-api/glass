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
        await mongo.db(config.databases.players).dropDatabase();
        mongo.close();
    });

    describe('player listeners', () => {

        it('player.identify', async () => {

            const {id, email, name} = playerOne;
            const player = await tasu.request('player.identify', {email});
            assert.equal(player.email, email);
            assert.equal(player.name, name);
            assert.equal(player.id, id);
        });

        it('player.get', async () => {

            const {id, email, name} = playerOne;
            const player = await tasu.request('player.get', {id});
            assert.equal(player.email, email);
            assert.equal(player.name, name);
            assert.equal(player.id, id);
        })

    });

});

