const Sequelize = require('sequelize')
const {STRING, UUID, UUIDV4} = Sequelize
const dbURL = process.env.DATABASE_URL || 'postgres://localhost/acme_user_departments_api_db'
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
    },
}, {
    hooks: {
      beforeSave: async function(user) {
        if (user.departmentId) {
          try {
            const usersInDept = await User.findAll({
              where: {
                departmentId: user.departmentId
              }
            })
            const error = new Error();
            error.message = 'Max 5 users in a department';
            if (usersInDept.length === 5) {
              console.log(error.message);
              throw error;
            }
          } catch(ex) {
            console.log(ex);
            throw ex;
          }
        }
      } 
    }
})

const Department = conn.define('department', {
    id: idObj,
    name: {
        type: STRING
    }
})

User.belongsTo(Department);
Department.hasMany(User);

const syncAndSeed = async() => {
    await conn.sync({ force: true })

    const departments = [
        { name: 'fishing' },
        { name: 'hunting' }
    ]

    const [fishing, hunting] = await Promise.all(departments.map(dept => Department.create(dept)));

    const users = [
        { name: 'Grey', departmentId: hunting.id },
        { name: 'Zach', departmentId: fishing.id }
    ]

    const [grey, zach] = await Promise.all(users.map(user => User.create(user)));
    return {
        departments: {
            fishing,
            hunting
        },
        users: {
            grey,
            zach
        },
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
