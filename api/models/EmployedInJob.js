const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

const Employer = require('./Employer');
const Employee = require('./Employee');

class EmployedInJob extends Model { }

EmployedInJob.init({
    employeeID: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Employee,
            key: 'employeeID'
        }
    },
    theEmployee: {
        type: DataTypes.VARCHAR(255),
        references: {
            model: Employee,
            key: 'employeeID',
            default: null,
        }
    },
    withCompany: {
        type: DataTypes.STRING(255),
        references: {
            model: Employee,
            key: 'employer'
        }
    },
    jobTitle: {
        type: DataTypes.STRING(255) // TINYTEXT equivalent
    },
    startDate: {
        type: DataTypes.DATE
    },
    endDate: {
        type: DataTypes.DATE
    }
}, {
    sequelize,
    modelName: 'EmployedInJob',
    tableName: 'employedInJob'
});

EmployedInJob.belongsTo(Employee, {
    foreignKey: 'employeeID',
    as: 'employeeID'
});

EmployedInJob.belongsTo(Employee, {
    foreignKey: 'employer',
    as: 'withCompany'
});

module.exports = EmployedInJob;
