const Sequelize = require('sequelize');

// use the same instance of sequelize we exported in the database.js file
const sequelize = require('../utils/database');
const User = require('./user.model');

const Session = sequelize.define('session', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    expireDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    token: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
});

module.exports = Session;