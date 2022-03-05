const Sequelize = require('sequelize');

// Create sequelize instance and connect to the database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
});

// Export sequelize instance because we want to use it in other files
module.exports = sequelize;