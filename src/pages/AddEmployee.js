import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addEmployee } from "../services/user.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AddEmployee() {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    contact: Yup.string().required("Contact is required"),
    role: Yup.string().required("Role is required"),
    officialID: Yup.string().required("Official ID is required"),
  });
  return (
    <div className=" row m-0 p-0 mt-5 pt-5">
      <div className="col-6 ">
        <div className="mx-5">
          <h3>A GROUP OF EFFICIENT AND INNOVATIVE PEOPLE</h3>
          <hr />
          <img
            src="https://radiantengineering.co/wp-content/uploads/2021/10/as-1.jpg"
            style={{ height: "200px" }}
            className="img-fluid mb-2"
          />
          
        </div>
      </div>
      <div className="col-6 d-flex justify-content-center align-items-center">
        <div className="shadow p-4 rounded" style={{ width: "400px" }}>
          <Formik
            initialValues={{
              name: "",
              contact: "",
              role: "",
              officialID: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              try {
                let response = await addEmployee(values);
                if (response.data.message == "Employee Added Successfully!") {
                  toast.success("Employee Added Successfully!");
                }
              } catch (error) {
                toast.error(error.response.data.error.contact[0])
              }
            }}
          >
            {({ touched, errors }) => (
              <div className="mt-2">
                <div className="row ">
                  <div className="">
                    <h4 className=" text-center mb-4 text-secondary">
                      <u>Add an employee</u>
                    </h4>
                    <Form>
                      <div className="form-group">
                        <label htmlFor="name ">Name</label>
                        <Field
                          name="name"
                          type="text"
                          className={`form-control mt-1 mb-3  ${touched.name && errors.name ? "is-invalid" : ""}`}
                          placeholder="Enter your name"
                        />
                        <ErrorMessage name="name" component="div" className="invalid-feedback" />
                      </div>

                      <div className="form-group">
                        <label htmlFor="contact">Contact</label>
                        <Field
                          name="contact"
                          type="text"
                          className={`form-control mt-1 mb-3 ${touched.contact && errors.contact ? "is-invalid" : ""}`}
                          placeholder="Enter your contact"
                        />
                        <ErrorMessage name="contact" component="div" className="invalid-feedback" />
                      </div>

                      <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <Field
                          name="role"
                          as="select"
                          className={`form-control mt-1 mb-3 ${touched.role && errors.role ? "is-invalid" : ""}`}
                        >
                          <option value="">Select a role</option>
                          <option value="2">Admin</option>
                          <option value="3">Supervisor</option>
                          <option value="4">Employee</option>
                        </Field>
                        <ErrorMessage name="role" component="div" className="invalid-feedback" />
                      </div>

                      <div className="form-group">
                        <label htmlFor="officialID">Official ID</label>
                        <Field
                          name="officialID"
                          type="text"
                          className={`form-control mt-1 mb-3 ${
                            touched.officialID && errors.officialID ? "is-invalid" : ""
                          }`}
                          placeholder="Enter your official ID"
                        />
                        <ErrorMessage name="officialID" component="div" className="invalid-feedback" />
                      </div>

                      <button type="submit" className="btn btn-primary w-100 mt-3">
                        Submit
                      </button>
                    </Form>
                  </div>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddEmployee;
