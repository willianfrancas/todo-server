const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const User = require('./user');
const cors = require('cors');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/tododb', { useNewUrlParser: true, useUnifiedTopology: true });

const myLogger = (req, res, next) => {
    console.log(req.body);
    next();
    console.log(res.body);
}
app.use(myLogger);

app.get('/user', (req, res) => {
    User.find().lean().exec((error, users) => {
        error ? res.status(500).send(error) : res.status(200).send(users);
    });
});

app.post('/user', (req, res) => {
    user = new User({
        firstName: '',
        lastName: '',
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone: '',
    });
    user.save((error, userSaved) => {
        error ? res.status(500).send(error) : res.status(200).send(userSaved);
    });
});

app.listen(7000);