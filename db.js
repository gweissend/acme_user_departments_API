const Sequelize = require('sequelize')
const {STRING, UUID, UUIDV4} = Sequelize
const dbURL = process.env.DATABASE_URL || 'postgres://localhost/acme_user_departments_API_db'
const conn = new Sequelize(dbURL, {logging: false})

const idObj = {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
}



// User model
// unique, non-null, non-empty name
// UUID for id
// departmentId references department
// Department model
// unique, non-null, non-empty name
// UUID for id
