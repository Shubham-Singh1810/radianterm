import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function AddEmployee() {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    contact: Yup.string().required("Contact is required"),
    role: Yup.string().required("Role is required"),
    password: Yup.string().required("Password is required"),
    officialId: Yup.string().required("Official ID is required"),
  });
  return (
    <div className=" row m-0 p-0 mt-5 pt-5">
      <div className="col-6 ">
        <div className="mx-5">
          <h3>A GROUP OF EFFICIENT AND INNOVATIVE PEOPLE</h3>
          <hr />
          <img src="https://radiantengineering.co/wp-content/uploads/2021/10/as-1.jpg" style={{height:"200px"}} className="img-fluid mb-2"/>
          <p>
            Radiant is an organization which offers civil engineering and
            architectural consultancy. It is a fast growing firm which has
            secured a prominent place in west Bengal for its outstanding
            proficiency in infrastructural as well as in architectural jobs. At
            present it is engaged in infrastructural jobs which involve
            development of 25 sqkm. Its architectural jobs span across more than
            a million sqft.
          </p>
          <p>
            Radiant has all energy of youth and guidance of experienced veterans
            from specific fields. It has unique complementarities, all required
            expertise, and long term understanding within the team. Radiant is
            well equipped with the most advanced software and it certainly
            follows most sophisticated knowhow in global context. Radiant is a
            trustworthy name for its excellence, punctuality and all time
            cooperation.
          </p>
          <p>
            Radiant has its own philosophy of work. It intends to create a
            healthy living environment by bringing nature close to people and
            thereby adding humanistic value to the living environment. It
            emphasis both functional and aesthetic aspects. Radiant believes in
            pouring passion, dedication and hard work in its assignment and
            thereby delivering the best value to its client. It intends to build
            up long term relationship with its client.
          </p>
        </div>
      </div>
      <div className="col-6 d-flex justify-content-center align-items-center">
        <div className="shadow p-4 rounded" style={{ width: "400px" }}>
          <Formik
            initialValues={{
              name: "",
              contact: "",
              role: "",
              password: "",
              officialId: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values);
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
                          className={`form-control mt-1 mb-3  ${
                            touched.name && errors.name ? "is-invalid" : ""
                          }`}
                          placeholder="Enter your name"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="contact">Contact</label>
                        <Field
                          name="contact"
                          type="text"
                          className={`form-control mt-1 mb-3 ${
                            touched.contact && errors.contact
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Enter your contact"
                        />
                        <ErrorMessage
                          name="contact"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <Field
                          name="role"
                          as="select"
                          className={`form-control mt-1 mb-3 ${
                            touched.role && errors.role ? "is-invalid" : ""
                          }`}
                        >
                          <option value="">Select a role</option>
                          <option value="admin">Admin</option>
                          <option value="supervisor">Supervisor</option>
                          <option value="employee">Employee</option>
                        </Field>
                        <ErrorMessage
                          name="role"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Field
                          name="password"
                          type="password"
                          className={`form-control mt-1 mb-3 ${
                            touched.password && errors.password
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Enter your password"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="officialId">Official ID</label>
                        <Field
                          name="officialId"
                          type="text"
                          className={`form-control mt-1 mb-3 ${
                            touched.officialId && errors.officialId
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Enter your official ID"
                        />
                        <ErrorMessage
                          name="officialId"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary w-100 mt-3"
                      >
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
    </div>
  );
}

export default AddEmployee;
