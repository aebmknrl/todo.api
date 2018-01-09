const express = require('express');

const router = express.Router();

const dbConnection = require('../config/dbconnection');

router.get('/test', async (req, res, next) => {
    try {
        await dbConnection.authenticate();
        res.json({ info: 'db connection sucessful' });
    } catch (err) {
        return err;
    }
    return next();
});

module.exports = router;
