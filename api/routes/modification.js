const express = require('express');
const router = express.Router();
const Employer = require('../models/Employer');
const { v4: uuidv4 } = require('uuid');

router.post('/addEmployer', async (req, res) => {
    const { companyName, headquartersAddress, parentCompany, industry, hasMerged, incorporationDate, dissolutionDate } = req.body;
    try {
        // Check if the employer already exists
        const existingEmployer = await Employer.findOne({ where: { companyName: companyName } });
        if (existingEmployer) {
            return res.status(400).json({ success: false, message: 'Employer already exists' });
        }

        const uniqueIdentifier = uuidv4(); // Generate a unique identifier

        // Create a new Employer with the same uniqueIdentifier
        const employer = await Employer.create({
            employerID: uniqueIdentifier,
            companyName: companyName,
            headquartersAddress: headquartersAddress,
            parentCompany: parentCompany,
            hasEmployed: null,
            industry: industry,
            hasMerged: hasMerged,
            incorporationDate: incorporationDate,
            dissolutionDate: dissolutionDate
        });
        return res.status(200).json({ success: true, message: 'Employer added successfully' });
    }
    catch (err) {
        console.error('Error adding employer:', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }


});

module.exports = router;
