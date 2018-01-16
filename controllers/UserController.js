const express = require('express');
const Users = require('../models/User');

const router = express.Router();

router.get('/dropdown', async (req, res, next) => {
    try {
        const userList = await Users.dropdown(req.userId);
        res.send(userList);
    } catch (err) {
        return err;
    }
    return next();
});

router.get('/list', async (req, res, next) => {
    try {
        const userList = await Users.findAll();
        res.send(userList);
    } catch (err) {
        return err;
    }
    return next();
});

module.exports = router;
