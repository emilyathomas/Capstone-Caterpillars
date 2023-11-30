const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('capstone', 'capstone', 'capstone123', {
    host: 'tj.thomii.com',
    dialect: 'mysql' // choose the dialect
});

module.exports = sequelize;

