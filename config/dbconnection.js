const configDb = require('./db');
const Sequelize = require('sequelize');


const cn = new Sequelize(configDb.database, configDb.username, configDb.password, {
    host: configDb.host,
    dialect: configDb.dialect,
    timezone: configDb.timezone,
    operatorsAliases: false,
});


module.exports = cn;
