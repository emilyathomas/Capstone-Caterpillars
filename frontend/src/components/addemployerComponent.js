import React from 'react';
import '../css/index.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';

const validationSchema = Yup.object({
    companyName: Yup.string().required('Comapny name is required'),
    headquartersAddress: Yup.string().required('Company address is required'),
    industry: Yup.string()
});

function AddEmployer() {

    const initialValues = {
        companyName: '',
        headquartersAddress: '',
        industry: ''
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
                alert('Employer already exists');
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
                                <ErrorMessage name="companyNameError" component="div" />
                            </div>
                            <div>
                                <label htmlFor="headquartersAddress">Headquarters Address:</label>
                                <Field type="text" id="headquartersAddress" name="headquartersAddress" />
                                <ErrorMessage name="headquartersAddressError" component="div" />
                            </div>
                            <div>
                                <label htmlFor="industry">Industry:</label>
                                <Field type="text" id="industry" name="industry" />
                                <ErrorMessage name="industry" component="div" />
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
