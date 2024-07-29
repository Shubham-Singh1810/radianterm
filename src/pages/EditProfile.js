import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useGlobalState } from "../GlobalProvider";
const EditProfile = () => {
  const { globalState } = useGlobalState();
  // const initialValues = {
  //   email: "",
  //   password: "",
  //   photo: "",
  //   address: "",
  //   designation: "",
  //   officeLocation: "",
  //   department: "",
  //   education: "",
  //   pan: "",
  //   aadhar: "",
  //   passbook: "",
  //   offerLetter: "",
  //   PFNO: "",
  //   ESINO: "",
  //   joiningDate: "",
  //   about: "",
  //   salary: "",
  //   dob: "",
  // };
const initialValues = globalState.user
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Required"),
    // Add more validations as needed
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="container p-5 editForm">
      <h4 className="text-center ">Complete Profile</h4>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ setFieldValue }) => (
          <Form>
            <div className="row m-0 p-0">
            <div className="form-group col-6">
                <label htmlFor="photo">Photo</label>
                <input
                  name="photo"
                  type="file"
                  className="form-control"
                  onChange={(event) => {
                    setFieldValue("photo", event.currentTarget.files[0]);
                  }}
                />
              </div>
              <div className="form-group col-6">
                <label htmlFor="email">Email</label>
                <Field name="email" type="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <div className="form-group col-6">
                <label htmlFor="password">Password</label>
                <Field name="password" type="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>

              

              <div className="form-group col-6">
                <label htmlFor="address">Address</label>
                <Field name="address" type="text" className="form-control" />
                <ErrorMessage name="address" component="div" className="text-danger" />
              </div>

              <div className="form-group col-6">
                <label htmlFor="designation">Designation</label>
                <Field name="designation" type="text" className="form-control" />
                <ErrorMessage name="designation" component="div" className="text-danger" />
              </div>

              <div className="form-group col-6">
                <label htmlFor="officeLocation">Office Location</label>
                <Field name="officeLocation" type="text" className="form-control" />
                <ErrorMessage name="officeLocation" component="div" className="text-danger" />
              </div>

              <div className="form-group col-6">
                <label htmlFor="department">Department</label>
                <Field name="department" type="text" className="form-control" />
                <ErrorMessage name="department" component="div" className="text-danger" />
              </div>

              <div className="form-group col-6">
                <label htmlFor="education">Education</label>
                <Field name="education" type="text" className="form-control" />
                <ErrorMessage name="education" component="div" className="text-danger" />
              </div>

              

              

              

              <div className="form-group col-6">
                <label htmlFor="PFNO">PF NO</label>
                <Field name="PFNO" type="text" className="form-control" />
                <ErrorMessage name="PFNO" component="div" className="text-danger" />
              </div>

              <div className="form-group col-6">
                <label htmlFor="ESINO">ESI NO</label>
                <Field name="ESINO" type="text" className="form-control" />
                <ErrorMessage name="ESINO" component="div" className="text-danger" />
              </div>

              <div className="form-group col-6">
                <label htmlFor="joiningDate">Joining Date</label>
                <Field name="joiningDate" type="date" className="form-control" />
                <ErrorMessage name="joiningDate" component="div" className="text-danger" />
              </div>

              <div className="form-group col-6">
                <label htmlFor="about">About</label>
                <Field name="about" type="text" className="form-control" />
                <ErrorMessage name="about" component="div" className="text-danger" />
              </div>

              <div className="form-group col-6">
                <label htmlFor="salary">Salary</label>
                <Field name="salary" type="number" className="form-control" />
                <ErrorMessage name="salary" component="div" className="text-danger" />
              </div>

              <div className="form-group col-6">
                <label htmlFor="dob">Date of Birth</label>
                <Field name="dob" type="date" className="form-control" />
                <ErrorMessage name="dob" component="div" className="text-danger" />
              </div>
              <div className="form-group col-6">
                <label htmlFor="passbook">Passbook</label>
                <Field name="passbook" type="text" className="form-control" />
                <ErrorMessage name="passbook" component="div" className="text-danger" />
              </div>

              <div className="form-group col-6">
                <label htmlFor="offerLetter">Offer Letter</label>
                <Field name="offerLetter" type="text" className="form-control" />
                <ErrorMessage name="offerLetter" component="div" className="text-danger" />
              </div>
              <div className="form-group col-6">
                <label htmlFor="aadhar">Aadhar</label>
                <Field name="aadhar" type="text" className="form-control" />
                <ErrorMessage name="aadhar" component="div" className="text-danger" />
              </div>
              <div className="form-group col-6">
                <label htmlFor="pan">PAN</label>
                <Field name="pan" type="text" className="form-control" />
                <ErrorMessage name="pan" component="div" className="text-danger" />
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-4 ">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProfile;
