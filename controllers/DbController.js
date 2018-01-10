const express = require('express');
const dbConnection = require('../config/dbconnection');
const Users = require('../models/User');

const router = express.Router();

router.get('/test', async (req, res, next) => {
    try {
        await dbConnection.authenticate();
        res.json({ info: 'db connection sucessful' });
    } catch (err) {
        return err;
    }
    return next();
});
router.get('/listusers', async (req, res, next) => {
    try {
        const userList = await Users.list(req.userId);
        res.send(userList);
    } catch (err) {
        return err;
    }
    return next();
});

module.exports = router;
