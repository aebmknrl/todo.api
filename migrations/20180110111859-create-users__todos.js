module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('users__todos', {
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
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('users__todos'),
};
