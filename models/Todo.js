const Sequelize = require('sequelize');
const sequelize = require('../config/dbconnection');
const User = require('./User');
// const UserTodo = require('./UserTodo');

const fields = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    description: {
        allowNull: false,
        type: Sequelize.TEXT,
    },
    isCompleted: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
    },
    color: {
        allowNull: true,
        type: Sequelize.STRING,
    },
    icon: {
        allowNull: true,
        type: Sequelize.STRING,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
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

const model = sequelize.define('todos', fields);

model.belongsTo(User);
model.belongsToMany(User, { through: 'users__todos', as: 'SharedTodosUsers', foreignKey: 'todoId' });
// User.hasMany(model, { through: 'users__todos', as: 'Todos', foreignKey: 'userId' });
module.exports = model;
