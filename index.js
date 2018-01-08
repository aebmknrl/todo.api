require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwtAuth = require('./middlewares/jwtAuth');
const routes = require('./routes/route');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json());
app.use(cors());
app.use(jwtAuth);
app.use(routes);

app.listen(8080, () => {
  console.log(`Example app listening on port 8080! The env is: ${process.env.NODE_ENV}`);
});
