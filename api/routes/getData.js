const express = require('express');
const router = express.Router();

const Employee = require('../models/Employee');
const Employer = require('../models/Employer');
const employedInJobModel = require('../models/EmployedInJob');

// Create an endpoint to get data by employerID
router.get('/:employerID', async (req, res) => {
  try {
    const { employerID } = req.params;
    console.log("Received employerID:", employerID); // Log the employerID

    // Find the employer by employerID and retrieve companyName
      const employerData = await Employer.findOne({
         where: { employerID: employerID },
         attributes: ['companyName', 'descendantCompanies', 'predecessorCompanies'],
    }); 

    console.log("Employer data:", employerData); // Log employerData

    if (!employerData) {
      return res.status(404).json({ success: false, message: 'Employer not found' });
    }

    // Use employerID to query employedInJobModel for all employees
    const employedInJobQuery = {
      where: { employerID: employerID },
      attributes: ['jobTitle', 'withCompany', 'theEmployee'],
    };

    console.log("EmployedInJob query:", employedInJobQuery); // Log the query

    const employedInJobs = await employedInJobModel.findAll(employedInJobQuery);

    if (!employedInJobs || employedInJobs.length === 0) {
      return res.status(404).json({ success: false, message: 'No employees found for this employer' });
    }

    const employees = [];

    for (const employedInJob of employedInJobs) {
      const employeeName = employedInJob.theEmployee;
      if (employeeName) {
        const [firstName, lastName] = employeeName.split(' ');

        const employee = await Employee.findOne({
          where: {
            firstName: firstName,
            lastName: lastName,
          },
          attributes: ['firstName', 'lastName'],
        });

        if (employee) {
          employees.push({
            firstName: employee.firstName,
            lastName: employee.lastName,
            jobTitle: employedInJob.jobTitle,
          });
        }
      }
    }

    if (employees.length === 0) {
      console.log("No valid employees found");
      return res.status(404).json({ success: false, message: 'No valid employees found' });
    }

    // Respond with the gathered data
    res.status(200).json({
      success: true,
      data: employees,
      companyName: employerData.companyName,
      descendantCompanies: employerData.descendantCompanies,
      predecessorCompanies: employerData.predecessorCompanies,
    });
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
