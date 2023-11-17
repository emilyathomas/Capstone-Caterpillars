const { Sequelize } = require('sequelize');

/*const sequelize = new Sequelize('Registration', 'dbmasteruser', 'caterpillar', {
    host: 'ls-8deb95ed6dabfe5d137ac54e82bffcbf1a0d745c.cpksepgttqar.us-east-1.rds.amazonaws.com',
    dialect: 'mysql' // choose the dialect
});*/

const sequelize = new Sequelize('Registration', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

//const sequelize = new Sequelize('Registration', 'root', 'caterpillar', {
//    host: 'localhost',
//    dialect: 'mysql'
//});
module.exports = sequelize;

