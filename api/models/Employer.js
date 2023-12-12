const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

const Employee = require('./Employee');

class Employer extends Model {// Custom method to update hasEmployed based on SQL snippet
    static async updateHasEmployed() {
        const sql = `
        UPDATE employer
        SET hasEmployed = (
          SELECT COUNT(DISTINCT employedInJob.employeeIDs)
          FROM employedInJob
          WHERE employedInJob.withCompany = employer.companyName)`;
        await sequelize.query(sql, { type: Sequelize.QueryTypes.UPDATE });
    }
}

Employer.init({
    employerID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
        field: 'employerID'
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: true,

    },
    headquartersAddress: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    parentCompany: {
        type: DataTypes.STRING,
        default: null
    },
    hasEmployed: {
        type: DataTypes.BIGINT,
        default: null
    },
    industry: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    hasMerged: {
        type: DataTypes.TINYINT,
        default: null
    },
    incorporationDate: {
        type: DataTypes.DATE,
        default: null
    },
    dissolutionDate: {
        type: DataTypes.DATE,
        default: null
    },
}, {
    sequelize,
    modelName: 'Employer',
    tableName: 'employer',
    timestamps: false,
});

module.exports = Employer;
