const Sequelize = require('sequelize');
const sequelize = require('../config/dbconnection');
const Todo = require('./Todo');
const UserTodo = require('./UserTodo');

const fields = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
    },
    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
    },
};

const model = sequelize.define('users', fields);
model.list = userId => sequelize
    .query(
        'SELECT u.id, u.username, u.name, u.lastname FROM users u WHERE id != :userId ORDER BY u.id',
        { type: sequelize.QueryTypes.SELECT, replacements: { userId } },
    );

model.belongsToMany(Todo, { through: UserTodo });

module.exports = model;
