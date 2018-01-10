const bcrypt = require('bcryptjs');

module.exports = {
    up: (queryInterface, Sequelize) => {
        const plainPassword = '$$abc@123$$';
        const hashedPassword = bcrypt.hashSync(plainPassword, 10);
        queryInterface.bulkInsert('users', [
            {
                username: 'alienriquebm',
                password: hashedPassword,
                name: 'Ali',
                lastname: 'Briceño',
                createdAt: '2017-05-25 02:45:14',
                updatedAt: '2017-05-25 02:45:14',
            },
            {
                username: 'admin',
                password: hashedPassword,
                name: 'Admin',
                createdAt: '2017-05-25 02:45:14',
                updatedAt: '2017-05-25 02:45:14',
            },
        ], {});
    },
    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.
    
          Example:
          return queryInterface.bulkDelete('Person', null, {});
        */
    },
};
