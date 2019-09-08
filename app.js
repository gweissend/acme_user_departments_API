const express = require('express');
const app = express();
const db = require('./db');
const {User} = db.models
app.use(express.json())
app.use(require('cors')());

const { pluralize } = require('inflection')
module.exports = app;

Object.entries(db.models).forEach(([name, model])=> {
    const baseRoute = `/api/${pluralize(name)}`
    const idRoute = `/api/${pluralize(name)}`
    app.get(baseRoute, (req, res, next) => {
        model.findAll()
            .then(name => res.send(name))
            .catch(next)
    })
    
    app.post(baseRoute, (req, res, next) => {
        model.create(req.body)
            .then(name => res.status(201).send(name))
            .catch(next);
    })
    
    app.delete(`${baseRoute}/:id`, (req, res, next) => {
        model.findByPk(req.params.id)
            .then(name => name.destroy())
            .then(res.sendStatus(204))
            .catch(next);
    })
    
    app.put(`${baseRoute}/:id`, (req, res, next) => {
        model.findByPk(req.params.id)
            .then(name => name.update(req.body))
            .then(updatedName => res.send(updatedName))
            .catch(next)
    })
})

// app.get('/api/users', (req, res, next) => {
//     User.findAll()
//         .then(user => res.send(user))
//         .catch(next)
// })

// app.post('/api/users', (req, res, next) => {
//     User.create(req.body)
//         .then(user => res.status(201).send(user))
//         .catch(next);
// })

// app.delete('/api/users/:id', (req, res, next) => {
//     User.findByPk(req.params.id)
//         .then(user => user.destroy())
//         .then(res.sendStatus(204))
//         .catch(next);
// })

// app.put('/api/users/:id', (req, res, next) => {
//     User.findByPk(req.params.id)
//         .then(user => user.update(req.body))
//         .then(updatedUser => res.send(updatedUser))
//         .catch(next)
// })