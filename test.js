const { expect } = require('chai')
const db = require('./db');
const app = require('supertest')(require('./app'));
const {User, Department} = db.models

describe('API tests', () => {
    let seed;
    beforeEach(async () => seed = await db.syncAndSeed());
    describe("DB functionality", () => {
        it('user table exist', () => {
            return expect(seed.users.grey.name).to.equal('Grey');
        })
        it('department table exist', () => {
            db.models.department.create({name: 'fishing'})
            return expect(seed.departments.fishing.name).to.equal('fishing');
        })
    })
})



describe('API', () => {
    describe('GET /api/users', ()=>{
        it('returns the users', ()=> {
            return app.get('/api/users')
                .expect(200)
                .then(response => {
                    expect(response.body.length).to.equal(2)
                })
        })
    })
})
