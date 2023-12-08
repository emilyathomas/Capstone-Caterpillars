
var express = require('express');
const router = express.Router();
const Employer = require('../models/Employer.js');
const { Op , literal} = require('sequelize');

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

router.post("/search", async (req, res) =>{
    const {query} = req.body;
    try {
      const results = await Employer.findAll({
        where: {
          companyName: {
            [Op.like]: literal(`'%${query}%' COLLATE utf8mb4_general_ci`),
          },
        },
      })
      res.json(results);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Insafdternal server error' });
    }
  });

module.exports = router;
