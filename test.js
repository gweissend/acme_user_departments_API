const { expect } = require('chai')
const db = require('./db');
// const {User, Department} = db.models

describe('Something', () => {
    let seed;
    beforeEach(async () => seed = await db.syncAndSend());
    describe("Tables", () => {
        it('user table exist', () => {
            expect(seed.models.user).true
        })
    })
})