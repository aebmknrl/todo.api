require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwtAuth = require('./middlewares/jwtAuth');
const routes = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(bodyParser.json());
app.use(cors());
app.use(jwtAuth);
app.use(routes);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port  ${process.env.PORT}! The env is: ${process.env.NODE_ENV}`);
});
