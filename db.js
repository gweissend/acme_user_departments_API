const Sequelize = require('sequelize')
const {STRING, UUID, UUIDV4} = Sequelize
const dbURL = process.env.DATABASE_URL || 'postgres://localhost/acme_user_departments_API_db'
const conn = new Sequelize(dbURL, {logging: false})

const idObj = {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
}

const User = conn.define('user', {
    id: idObj,
    name: {
        type: STRING
    }
})

const Department = conn.define('department', {
    id: idObj,
    name: {
        type: STRING
    }
})

const syncAndSeed = async() => {
    await conn.sync({ force: true })

    const users = [
        { name: 'Grey'},
        { name: 'Zach' }
    ]

    const [grey, zach] = await Promise.all(users.map(user => User.create(user)));
    return {
        users: {
            grey,
            zach
        }
    }
}

module.exports = {
    syncAndSeed,
    models: {
        User,
        Department
    }
}
// User model
// unique, non-null, non-empty name
// UUID for id
// departmentId references department
// Department model
// unique, non-null, non-empty name
// UUID for id
