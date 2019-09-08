const express = require('express');
const app = express();
const db = require('./db');
const {User} = db.models

module.exports = app;

app.get('/api/users', (req, res, next) => {
    User.findAll()
        .then(user => res.send(user))
        .catch(next)
})