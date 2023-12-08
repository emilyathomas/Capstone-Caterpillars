var express = require('express');
const router = express.Router();
const Employer = require('../models/Employer.js');

const sampleData = [
    { id: 1, companyName: 'best buy', headquartersAddress: 'a;lsfkj@lgfks', descendantCompanies: "13123123", predecessorCompanies: '', hasEmployed: 20 },
    { id: 1, companyName: 'asd buy', headquartersAddress: 'a;lsfkj@lgfks', descendantCompanies: "13123123", predecessorCompanies: '', hasEmployed: 20 },
    { id: 1, companyName: 'beasdfasdst buy', headquartersAddress: 'a;lsfkj@lgfks', descendantCompanies: "13123123", predecessorCompanies: '', hasEmployed: 20 }
];
/* GET home page. */
router.get("/", async (req, res) => {

    try {
        const Employers = await Employer.findAll();
        res.json(Employers);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;