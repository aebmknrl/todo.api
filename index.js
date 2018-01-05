require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(8080, () => {
  console.log(`Example app listening on port 8080! The env is: ${process.env.NODE_ENV}`);
});
