import React from 'react';
import '../css/index.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';

const validationSchema = Yup.object({
    companyName: Yup.string().required('Comapny name is required'),
    headquartersAddress: Yup.string().required('Company address is required')
});

function AddEmployer() {

    const initialValues = {
        companyName: '',
        headquartersAddress: '',
        parentCompany: '',
        industry: '',
        hasMerged: false,
        incorporationDate: null,
        dissolutionDate: null
    };

    const handleSubmit = async (values) => {
        //     e.preventDefault();
        try {
            // Perform your API call to send the form data to the server here
            console.log('Form values submitted:', values);
            // You can use fetch or any other library to send a POST request to your server
            // Example:
            const response = await fetch('http://localhost:4000/modification/addEmployer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const add = await response.json();

            if (add.success) {
                console.log('Successful');
                alert('Information submitted. Database updating.');
            } else {
                console.log('Employer already exists');
                // alert('Employer already exists');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form');
        }
    };

    return (
        <Box>
            <Stack sx={{ margin: 'auto' }}>
                <div><center>
                    <h1>Add Employer</h1></center>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            handleSubmit(values);
                            setSubmitting(false);
                        }}
                    >{(formik) => (
                        <Form>
                            <div>
                                <label htmlFor="companyName">Company Name:</label>
                                <Field type="text" id="companyName" name="companyName" />
                                <ErrorMessage name="companyName" component="div" className="error-message" />
                            </div>
                            <div>
                                <label htmlFor="headquartersAddress">Headquarters Address:</label>
                                <Field type="text" id="headquartersAddress" name="headquartersAddress" />
                                <ErrorMessage name="headquartersAddress" component="div" className="error-message" />
                            </div>
                            <div>
                                <label htmlFor="parentCompany">Parent Company:</label>
                                <Field type="text" id="parentCompany" name="parentCompany" />
                                <ErrorMessage name="parentCompany" component="div" />
                            </div>
                            <div>
                                <label htmlFor="industry">Industry:</label>
                                <Field type="text" id="industry" name="industry" />
                                <ErrorMessage name="industry" component="div" />
                            </div>
                            <div>
                                <label htmlFor="hasMerged">Have they merged?</label>
                                <Field type="checkbox" id="hasMerged" name="hasMerged" />
                                <ErrorMessage name="hasMerged" component="div" />
                            </div>
                            <div>
                                <label htmlFor="incorporationDate ">Incorporation Date:</label>
                                <Field type="date" id="incorporationDate " name="incorporationDate " />
                                <ErrorMessage name="incorporationDate " component="div" />
                            </div>
                            <div>
                                <label htmlFor="dissolutionDate ">Dissolution Date:</label>
                                <Field type="date" id="dissolutionDate " name="dissolutionDate " />
                                <ErrorMessage name="dissolutionDate " component="div" />
                            </div>
                            {/*Submit button*/}
                            <button type="submit">Submit</button>
                        </Form>)}
                    </Formik>
                </div>
            </Stack>
        </Box>
    )
};

export default AddEmployer;
