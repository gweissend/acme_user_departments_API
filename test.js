const { expect } = require('chai')
const db = require('./db');
const {User, Department} = db.models

describe('API tests', () => {
    let seed;
    beforeEach(async () => seed = await db.syncAndSeed());
    describe("DB functionality", () => {
        it('user table exist', () => {
            return expect(seed.users.grey.name).to.equal('Grey');
        })
    })
})
