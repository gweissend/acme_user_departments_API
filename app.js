const express = require('express');
const app = express();
const db = require('./db');
const {User} = db.models
app.use(express.json())

module.exports = app;

app.get('/api/users', (req, res, next) => {
    User.findAll()
        .then(user => res.send(user))
        .catch(next)
})

app.post('/api/users', (req, res, next) => {
    User.create(req.body)
        .then(user => res.status(201).send(user))
        .catch(next);
})

app.delete('/api/users/:id', (req, res, next) => {
    User.findByPk(req.params.id)
        .then(user => user.destroy())
        .then(res.sendStatus(204))
        .catch(next);
})