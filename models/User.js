const Sequelize = require('sequelize');
const sequelize = require('../config/dbconnection');
// const Todo = require('./Todo');

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
model.dropdown = userId => sequelize
    .query(
        'SELECT u.id, u.username, u.name, u.lastname FROM users u WHERE id != :userId ORDER BY u.id',
        { type: sequelize.QueryTypes.SELECT, replacements: { userId } },
    );

const cleanTodosOfUser = async (userId, transaction) => {
    await sequelize.query(
        'DELETE FROM users__todos WHERE userId = :userId',
        {
            type: sequelize.QueryTypes.DELETE,
            replacements: { userId },
            transaction,
        },
    );
};

const insertTodosToUser = async (todoIds, userId, transaction) => {
    await sequelize.query(
        `INSERT INTO users__todos SELECT null, :userId, t.id, NOW(), NOW() FROM todos t WHERE t.id IN (${todoIds.join()})`,
        {
            type: sequelize.QueryTypes.INSERT,
            replacements: { userId },
            transaction,
        },
    );
};

model.setTodos = (todoIds, userId) => sequelize.transaction(async (t) => {
    await cleanTodosOfUser(userId, t);
    await insertTodosToUser(todoIds, userId, t);
    return { id: userId, todos: todoIds };
});

// model.hasMany('todos');
// model.belongsToMany('todos', { through: 'users__todos', as: 'MySharedTodos', foreignKey: 'userId' });
// Todo.belongsToMany(model, { through: 'users__todos', as: 'Users', foreignKey: 'todoId' });

module.exports = model;
