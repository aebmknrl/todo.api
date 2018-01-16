const express = require('express');

const router = express.Router();

router.use('/auth', require('../controllers/AuthController'));
router.use('/user', require('../controllers/UserController'));
router.use('/db', require('../controllers/DbController'));

router.get('/', (req, res) => {
    res.send(`api server is up in ${process.env.NODE_ENV} environment at port  ${process.env.PORT}`);
});

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(404).send({ error: 'resource not found' });
});

module.exports = router;
