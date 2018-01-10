module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('todos', {
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
                foreignKey: true,
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
        }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('todos'),
};
