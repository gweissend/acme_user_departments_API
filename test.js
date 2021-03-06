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
            return expect(seed.departments.fishing.name).to.equal('fishing');
        })
        it('user belongs to department', () => {
            return expect(seed.users.zach.departmentId).to.equal(seed.departments.fishing.id);
        })
    })
})



describe('API', () => {
    let seed;
    beforeEach(async () => seed = await db.syncAndSeed());
    describe('GET /api/users', ()=>{
        it('returns the users', ()=> {
            return app.get('/api/users')
                .expect(200)
                .then(response => {
                    expect(response.body.length).to.equal(2)
                })
        })
    })
    describe('POST /api/users', () => {
        it('posts a user', () => {
            return app.post('/api/users')
                .send({ name: 'eric', departmentId: seed.departments.fishing.id})
                .expect(201)
                .then( response => {
                    expect(response.body.name).to.equal('eric');
                })
        })
    })
    describe('DELETE /api/users/:id', () => {
        it('deletes a user', () => {
            return app.delete(`/api/users/${seed.users.zach.id}`)
                .expect(204)
        })
    })
    describe('PUT /api/users/:id', () => {
        it('updates a user', () => {
            return app.put(`/api/users/${seed.users.zach.id}`)
                .send({ name: 'Zaq'})
                .expect(200)
                .then( response => {
                    expect(response.body.name).to.equal('Zaq')
                    expect(response.body.departmentId).to.equal(seed.departments.fishing.id)
                })
        })
    })
    describe('GET /api/departments', ()=>{
        it('returns the depts', ()=> {
            return app.get('/api/departments')
                .expect(200)
                .then(response => {
                    expect(response.body.length).to.equal(2)
                })
        })
    })
    describe('POST /api/departments', () => {
        it('posts a dept', () => {
            return app.post('/api/departments')
                .send({ name: 'frisbee'})
                .expect(201)
                .then( response => {
                    expect(response.body.name).to.equal('frisbee');
                })
        })
    })
    describe('DELETE /api/departments/:id', () => {
        it('deletes a dept', () => {
            return app.delete(`/api/departments/${seed.departments.hunting.id}`)
                .expect(204)
        })
    })
    describe('PUT /api/departments/:id', () => {
        it('updates a dept', () => {
            return app.put(`/api/departments/${seed.departments.hunting.id}`)
                .send({ name: 'bowhunting'})
                .expect(200)
                .then( response => {
                    expect(response.body.name).to.equal('bowhunting')
                })
        })
    })
})
