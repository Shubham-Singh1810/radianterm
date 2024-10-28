import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useGlobalState } from "../GlobalProvider";
import { editProfile } from "../services/user.service";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const EditProfile = () => {
  const { setGlobalState, globalState } = useGlobalState();
  const navigate = useNavigate();
  const {
    photo,
    pan,
    passbook,
    aadhar,
    offerLetter,
    password,
    ...initialValues
  } = globalState.user;
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    address: Yup.string().required("Address is required"),
    officeLocation: Yup.string().required("Office location is required"),
    department: Yup.string().required("Department is required"),
    education: Yup.string().required("Education is required"),
    joiningDate: Yup.date().required("Joining date is required"),
    dob: Yup.date().required("Date of birth is required"),
  });

  const handleSubmit = async (values) => {
    try {
      let response = await editProfile(values);
      if (response?.data?.message == "Profile updated successfully!") {
        toast.success(response?.data?.message);
        setTimeout(() => {
          localStorage.setItem(
            "radient_user",
            JSON.stringify(response?.data?.user)
          );
          setGlobalState({
            ...globalState,
            user: response.data.user,
            access_token: response.data.access_token,
          });
          navigate("/");
        }, 1500);
      }else{
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };

  return (
    <div className="container p-md-5 p-2 mt-3 mt-md-0 editForm">
      <h2 className="text-center ">Complete Profile</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnBlur={true}
        validateOnChange={true}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div className="row m-0 p-0">
              <div className="form-group col-md-6 col-12">
                <label htmlFor="photo">Photo</label>
                <input
                  name="photo"
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    setFieldValue("photo", file ? file : ""); // Ensure empty value if no file selected
                  }}
                />
                <ErrorMessage
                  name="photo"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group col-md-6 col-12">
                <label htmlFor="email">Email</label>
                <Field name="email" type="email" className="form-control" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group col-md-6 col-12">
                <label htmlFor="password">Password*</label>
                <Field
                  name="password"
                  type="password"
                  className="form-control "
                />
                {(!values.password || values.password.length < 8) && (
                  <p className="text-danger mb-0">
                    Password must be at least 8 characters
                  </p>
                )}
              </div>
              <div className="form-group col-md-6 col-12">
                <label htmlFor="address">Address*</label>
                <Field name="address" type="text" className="form-control" />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group col-md-6 col-12">
                <label htmlFor="designation">Designation*</label>
                <Field
                  name="designation"
                  type="text"
                  readOnly
                  className="form-control"
                />
                <ErrorMessage
                  name="designation"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group col-md-6 col-12">
                <label htmlFor="officeLocation">Office Location*</label>
                <Field
                  name="officeLocation"
                  type="text"
                  className="form-control"
                />
                <ErrorMessage
                  name="officeLocation"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group col-md-6 col-12">
                <label htmlFor="department">Department*</label>
                <Field name="department" type="text" className="form-control" />
                <ErrorMessage
                  name="department"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group col-md-6 col-12">
                <label htmlFor="education">Highest Education*</label>
                <Field name="education" type="text" className="form-control" />
                <ErrorMessage
                  name="education"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group col-md-6 col-12">
                <label htmlFor="PFNO">PF NO</label>
                <Field name="PFNO" type="text" className="form-control" />
                <ErrorMessage
                  name="PFNO"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group col-md-6 col-12">
                <label htmlFor="ESINO">ESI NO</label>
                <Field name="ESINO" type="text" className="form-control" />
                <ErrorMessage
                  name="ESINO"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group col-md-6 col-12">
                <label htmlFor="joiningDate">Joining Date*</label>
                <Field
                  name="joiningDate"
                  type="date"
                  className="form-control"
                />
                <ErrorMessage
                  name="joiningDate"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group col-md-6 col-12">
                <label htmlFor="dob">Date of Birth*</label>
                <Field name="dob" type="date" className="form-control" />
                <ErrorMessage
                  name="dob"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group col-md-12 col-12">
                <label htmlFor="about">Bio</label>
                <Field
                  name="about"
                  as="textarea"
                  className="form-control"
                  rows="3"
                />
                <ErrorMessage
                  name="about"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="col-12">
                <h4 className="mt-4 text-secondary">
                  <u>Upload Documents</u>
                </h4>
              </div>
              <div className="form-group col-md-6 col-12">
                <label htmlFor="passbook">Passbook</label>
                <input
                  name="passbook"
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={(event) => {
                    setFieldValue("passbook", event.currentTarget.files[0]);
                  }}
                />
                <ErrorMessage
                  name="passbook"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group col-md-6 col-12">
                <label htmlFor="offerLetter">Offer Letter</label>
                <input
                  name="offerLetter"
                  type="file"
                  className="form-control"
                  accept="application/pdf"
                  onChange={(event) => {
                    setFieldValue("offerLetter", event.currentTarget.files[0]);
                  }}
                />
                <ErrorMessage
                  name="offerLetter"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group col-md-6 col-12">
                <label htmlFor="aadhar">Aadhar</label>
                <input
                  name="aadhar"
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(event) => {
                    setFieldValue("aadhar", event.currentTarget.files[0]);
                  }}
                />
                <ErrorMessage
                  name="aadhar"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group col-md-6 col-12">
                <label htmlFor="pan">PAN</label>
                <input
                  name="pan"
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(event) => {
                    setFieldValue("pan", event.currentTarget.files[0]);
                  }}
                />
                <ErrorMessage
                  name="pan"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-4">
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default EditProfile;
