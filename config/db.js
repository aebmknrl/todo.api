const dotenv = require('dotenv');

// Tweak to execute the migrations and seeders when api is not at runtime
if (!process.env.DB_NAME) {
    dotenv.config();
}

module.exports = {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '-04:00',
};
