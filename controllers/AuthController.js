const express = require('express');
const jwt = require('jsonwebtoken');
const Validator = require('validatorjs');
const Users = require('../models/users');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/signin', async (req, res) => {
    const data = {
        username: req.body.username,
        password: req.body.password,
    };
    const rules = {
        username: 'required',
        password: 'required|min:6',
    };
    const validation = new Validator(
        data, rules,
        {
            'required.username': 'username field is required',
            'required.password': 'password field is required',
            'min.password': 'password must be at least 6 characters',
        },
    );

    if (validation.fails()) {
        return res.status(500).send(validation.errors);
    }
    const user = await Users.findOne({
        where: { username: req.body.username },
        attributes: ['id', 'username', 'password'],
    });
    if (!user) {
        return res.status(403).send({ error: 'user or password invalid' });
    }
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
        return res.status(403).send({ error: 'user or password invalid' });
    }
    const token = jwt.sign({ id: user.id, user: user.username }, process.env.KEY_APP, { expiresIn: '12h' });
    res.json({ username: user.username, token });
    return true;
});

module.exports = router;
