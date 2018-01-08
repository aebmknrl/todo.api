const express = require('express');

const router = express.Router();

router.use('/auth', require('../controllers/AuthController'));

router.get('/test', (req, res) => {
  res.send('Test endpoinnt');
});
router.get('/', (req, res) => {
  res.send('API SERVER UP');
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(404).send({ error: 'resource not found' });
});

module.exports = router;
