// import React, { useState } from "react";
// import '../css/index.css'
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { Box } from '@mui/material';
// import Stack from '@mui/material/Stack';
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import TextField from "@mui/material/TextField";
// import DateField from "@mui/material/TextField";
// import BooleanField from "@mui/material/TextField";
// import Button from "@mui/material/Button";

// const validationSchema = Yup.object({
//     companyName: Yup.string().required('Comapny name is required'),
//     headquartersAddress: Yup.string().required('Company address is required')
// });

// // function AddEmployer() {

// //     const initialValues = {
// //         companyName: '',
// //         headquartersAddress: '',
// //         parentCompany: '',
// //         industry: '',
// //         hasMerged: false,
// //         incorporationDate: null,
// //         dissolutionDate: null
// //     };

// //     const handleSubmit = async (values) => {
// //         try {
// //             console.log('Form values submitted:', values);

// //             const response = await fetch('http://localhost:4000/modification/addEmployer', {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                 },
// //                 body: JSON.stringify(values),
// //             });

// //             if (response.ok) {
// //                 console.log('Company Add Successful');
// //                 alert('Company add successful. Database updating.');
// //             } else {
// //                 console.log('Company already exists');
// //                 alert('Company already exists');
// //             }
// //         } catch (error) {
// //             console.error('Error submitting form:', error);
// //             alert('Error submitting form');
// //         }

// //     };

// //     return (
// //         <Box>
// //             <Stack sx={{ margin: 'auto' }}>
// //                 <div><center>
// //                     <h1>Add Company</h1></center>
// //                     <Formik
// //                         initialValues={initialValues}
// //                         validationSchema={validationSchema}
// //                         onSubmit={(values, { setSubmitting }) => {
// //                             handleSubmit(values);
// //                             setSubmitting(false);
// //                         }}
// //                     >{(formik) => (
// //                         <Form>
// //                             <div>
// //                                 <label htmlFor="companyName">Company Name:</label>
// //                                 <Field type="text" id="companyName" name="companyName" />
// //                                 <ErrorMessage name="companyName" component="div" className="error-message" />
// //                             </div>
// //                             <div>
// //                                 <label htmlFor="headquartersAddress">Headquarters Address:</label>
// //                                 <Field type="text" id="headquartersAddress" name="headquartersAddress" />
// //                                 <ErrorMessage name="headquartersAddress" component="div" className="error-message" />
// //                             </div>
// //                             <div>
// //                                 <label htmlFor="parentCompany">Parent Company:</label>
// //                                 <Field type="text" id="parentCompany" name="parentCompany" />
// //                                 <ErrorMessage name="parentCompany" component="div" />
// //                             </div>
// //                             <div>
// //                                 <label htmlFor="industry">Industry:</label>
// //                                 <Field type="text" id="industry" name="industry" />
// //                                 <ErrorMessage name="industry" component="div" />
// //                             </div>
// //                             <div>
// //                                 <label htmlFor="hasMerged">Have they merged?</label>
// //                                 <Field type="checkbox" id="hasMerged" name="hasMerged" />
// //                                 <ErrorMessage name="hasMerged" component="div" />
// //                             </div>
// //                             <div>
// //                                 <label htmlFor="incorporationDate ">Incorporation Date:</label>
// //                                 <Field type="date" id="incorporationDate " name="incorporationDate " />
// //                                 <ErrorMessage name="incorporationDate " component="div" />
// //                             </div>
// //                             <div>
// //                                 <label htmlFor="dissolutionDate ">Dissolution Date:</label>
// //                                 <Field type="date" id="dissolutionDate " name="dissolutionDate " />
// //                                 <ErrorMessage name="dissolutionDate " component="div" />
// //                             </div>
// //                             {/*Submit button*/}
// //                             <button type="submit">Submit</button>
// //                         </Form>)}
// //                     </Formik>
// //                 </div>
// //             </Stack>
// //         </Box>
// //     )
// // };

// // export default AddEmployer;

// function AddEmployer() {
//     const [addDialogOpen, setAddDialogOpen] = useState(false);

//     const handleAddDialogClose = () => {
//         if (addDialogOpen) {
//             setAddDialogOpen(false);
//         } else {
//             setAddDialogOpen("addEmployer");
//         }
//         console.log("Toggle Add Employer Form");
//     };
//     const [addData, setAddData] = useState({
//         headquartersAddress: '',
//         parentCompany: '',
//         industry: '',
//         hasMerged: false,
//         incorporationDate: null,
//         dissolutionDate: null
//     });

//     const initialValues = {
//         companyName: '',
//         headquartersAddress: '',
//         parentCompany: '',
//         industry: '',
//         hasMerged: false,
//         incorporationDate: null,
//         dissolutionDate: null
//     };

//     const handleAddSubmit = async (values) => {
//         try {
//             console.log('Form values submitted:', values);

//             const response = await fetch('http://localhost:4000/modification/addEmployer', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(values),
//             });

//             if (response.ok) {
//                 window.location.reload();
//             } else {
//                 console.error("Error adding employer:", response.statusText);
//             }
//         } catch (error) {
//             console.error("Error adding employer:", error);
//         }
//     };

//     //  const handleAdd = (employerID, event) => {
//     //             event.stopPropagation();
//     //             console.log('Adding Employer');};


//     //             setAddDialogOpen(true);
//     //           };
//     //           const handleAddDialogClose = () => {
//     //             setAddDialogOpen(false);
//     //             setAddingEmployerID(null);
//     //           };

//     // const handleAddDialogClose = () => {
//     //     setAddDialogOpen(false);
//     // };

//     return (
//         <Box>
//             <>
//                 <Dialog open={addDialogOpen} onClose={handleAddDialogClose}>
//                     <DialogTitle>Add Employer</DialogTitle>
//                     <DialogContent>
//                         <TextField
//                             label="Company Name"
//                             value={addData.companyName}
//                             onChange={(e) =>
//                                 setAddData({ ...addData, companyName: e.target.value })
//                             }
//                             fullWidth
//                         />
//                         <TextField
//                             label="Industry"
//                             value={addData.industry}
//                             onChange={(e) =>
//                                 setAddData({ ...addData, industry: e.target.value })
//                             }
//                             fullWidth
//                         />
//                         <TextField
//                             label="Headquarters Address"
//                             value={addData.headquartersAddress}
//                             onChange={(e) =>
//                                 setAddData({
//                                     ...addData,
//                                     headquartersAddress: e.target.value,
//                                 })
//                             }
//                             fullWidth
//                         />
//                         <TextField
//                             label="Has Employed"
//                             value={addData.hasEmployed}
//                             onChange={(e) =>
//                                 setAddData({ ...addData, hasEmployed: e.target.value })
//                             }
//                             fullWidth
//                         />
//                         <DateField
//                             label="Incorporation Date:"
//                             value={addData.incorporationDate}
//                             onChange={(e) =>
//                                 setAddData({ ...addData, incorporationDate: e.target.value })
//                             }
//                             fullWidth
//                         />
//                         <DateField
//                             label="Dissolution Date:"
//                             value={addData.dissolutionDate}
//                             onChange={(e) =>
//                                 setAddData({ ...addData, dissolutionDate: e.target.value })
//                             }
//                             fullWidth
//                         />
//                         <BooleanField
//                             label="Has the company merged?"
//                             value={addData.hasMerged}
//                             onChange={(e) =>
//                                 setAddData({ ...addData, hasMerged: e.target.value })
//                             }
//                             fullWidth
//                         />
//                     </DialogContent>
//                     <DialogActions>
//                         <Button onClick={handleAddDialogClose}>Cancel</Button>
//                         <Button onClick={() => handleSubmit()}>
//                             Submit
//                         </Button>
//                     </DialogActions>
//                 </Dialog>
//             </>
//         </Box>
//     )
// };

// export default AddEmployer;
