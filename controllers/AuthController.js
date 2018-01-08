const Users = require('../models/Users');

const express = require('express');

const router = express.Router();

const jwt = require('jsonwebtoken');

const _ = require('lodash');

const Validator = require('validatorjs');

router.post('/signin', (req, res) => {
    const data = {
        username : req.body.username,
        password: req.body.password
    };
    const rules = {
        username: 'required',
        password: 'required|min:6'
    }
    const validation = new Validator(data, rules,
        {
            'required.username' : 'username field is required',
            'required.password' : 'password field is required',
            'min.password': 'password must be at least 6 characters'
        }
    );

    if (validation.fails()){
        return res.status(500).send(validation.errors);
    }

    const user = _.find(Users, (o) => {
        return o.username === req.body.username;
    });
    if (!user) {
        return res.status(403).send({ error: 'user or password invalid' });
    }
    if (req.body.password !== user.password) {
        return res.status(403).send({ error: 'user or password invalid' });
    }
    const token = jwt.sign({ user: user.username }, process.env.KEY_APP, { expiresIn: '12h' });
    res.json({ user: user.username, token });
});

module.exports = router;
