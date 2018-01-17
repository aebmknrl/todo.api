const Sequelize = require('sequelize');
const sequelize = require('../config/dbconnection');

const fields = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    todoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'todos',
            key: 'id',
        },
    },
};

const model = sequelize.define('users__todos', fields);

module.exports = model;
