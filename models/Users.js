const Sequelize = require('sequelize');
const sequelize = require('../config/dbconnection');

const fields = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    username: Sequelize.STRING,
    password: Sequelize.STRING,
};

const Users = sequelize.define('User', fields);
Users.list = () => sequelize
    .query(
        'SELECT u.id, u.username FROM users u ORDER BY u.id',
        { type: sequelize.QueryTypes.SELECT },
    );
module.exports = Users;
