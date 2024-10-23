import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addProject } from "../services/project.service";
import { getClients } from "../services/user.service";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const initialValues = {
  name: "",
  client: "",
  location: "",
  startDate: "",
  endDate: "",
  status: "",
  projectType: "",
  projectDescription: "",
  projectCost: "",
  developmentArea: "",
  projectNature: "",
  projectScope: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  client: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
  startDate: Yup.date().required("Required"),
  endDate: Yup.date(),
  status: Yup.string().required("Required"),
  projectType: Yup.string().required("Required"),
  projectDescription: Yup.string().required("Required"),
  projectCost: Yup.number(),
  developmentArea: Yup.string(),
  projectNature: Yup.string(),
});

const AddProject = () => {
  const navigate = useNavigate();
  const [clientList, setClientList] = useState();
  const getClientsList = async () => {
    try {
      let response = await getClients();
      console.log(response);
      setClientList(response?.data?.clients);
    } catch (error) {}
  };
  useEffect(() => {
    getClientsList();
  }, []);
  const handleSubmit = async (values) => {
    try {
      let response = await addProject(values);
      if (response?.data?.message == "Project Added Successfully!") {
        toast.success(response?.data?.message);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };
  return (
    <>
      <div id="carouselExampleIndicators" className="carousel slide">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={0}
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={1}
            aria-label="Slide 2"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={2}
            aria-label="Slide 3"
          />
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="/images/korangNallahDam.png"
              className="d-block w-100"
              alt="..."
              style={{ height: "350px" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="/images/Reeli-Khola-Bridge.png"
              className="d-block w-100"
              alt="..."
              style={{ height: "350px" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="/images/Marine-Drive.png"
              className="d-block w-100"
              alt="..."
              style={{ height: "350px" }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container my-5 editForm">
        <div
          style={{ background: "ghostwhite" }}
          className="p-3 rounded shadow"
        >
          <h2 className=" text-center ">
            <b className="text-secondary  p-1 ">Add New Project</b>
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            
          >
            {({setFieldValue}) => (
              <Form>
                <div className="row">
                  <div className="form-group col-md-6 col-12 ">
                    <label htmlFor="name">Project Name</label>
                    <Field name="name" type="text" className="form-control" />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="form-group col-md-6 col-12 ">
                    <label htmlFor="client">Client</label>
                    <Field name="client" as="select" className="form-control">
                      <option value="">Select</option>
                      {clientList?.map((v, i) => {
                        return <option value={v?.name}>{v?.name}</option>;
                      })}
                    </Field>
                    <ErrorMessage
                      name="client"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="form-group col-md-6 col-12">
                    <label htmlFor="location">Location</label>
                    <Field
                      name="location"
                      type="text"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="location"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group col-md-6 col-12">
                    <label htmlFor="status">Status</label>
                    <Field name="status" as="select" className="form-control">
                      <option value="">Select</option>
                      <option value="0">Not Started</option>
                      <option value="1">Started</option>
                      <option value="2">Partially Completed</option>
                      <option value="3">Completed</option>
                    </Field>
                    <ErrorMessage
                      name="status"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group col-md-6 col-12">
                    <label htmlFor="startDate">Start Date</label>
                    <Field
                      name="startDate"
                      type="date"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="startDate"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="form-group col-md-6 col-12">
                    <label htmlFor="endDate">End Date</label>
                    <Field
                      name="endDate"
                      type="date"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="endDate"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  

                  <div className="form-group col-md-6 col-12">
                    <label htmlFor="projectType">Project Type</label>

                    <Field
                      name="projectType"
                      as="select"
                      className="form-control"
                    >
                      <option value="">Select</option>
                      <option value="Architectural & Town Planning">
                        Architectural & Town Planning
                      </option>
                      <option value="PHE Projects">PHE Projects</option>
                      <option value="Transportation">Transportation</option>
                      <option value="Interior Design">Interior Design</option>
                      <option value="Landscape Design">Landscape Design</option>
                      <option value="Offshore Structures">
                        Offshore Structures
                      </option>
                      <option value="PMC & Execution">PMC & Execution</option>
                      <option value="Survey">Survey</option>
                    </Field>
                    <ErrorMessage
                      name="projectType"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group col-md-6 col-12">
                    <label htmlFor="projectNature">Project Nature</label>
                    <Field
                      name="projectNature"
                      as="select"
                      className="form-control"
                    >
                      <option value="">Select</option>
                      <option value="DPR/Consultancy">
                        DPR/Consultancy
                      </option>
                      <option value="PMC/PMU/IEC/SQC">PMC/PMU/IEC/SQC</option>
                      <option value="PDMC">PDMC</option>
                      <option value="Turnkey">Turnkey</option>
                      
                    </Field>
                    <ErrorMessage
                      name="projectNature"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group col-md-6 col-12">
                    <label htmlFor="projectScope">Project Scope</label>
                    <input
                      name="projectScope"
                      type="file"
                      accept=".pdf"
                      className="form-control"
                      onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        setFieldValue("projectScope", file);
                      }}
                    />
                    <ErrorMessage
                      name="projectScope"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group col-md-6 col-12">
                    <label htmlFor="projectDescription">
                      Project Description
                    </label>
                    <Field
                      name="projectDescription"
                      type="text"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="projectDescription"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="form-group col-md-6 col-12">
                    <label htmlFor="projectCost">Project Cost</label>
                    <Field
                      name="projectCost"
                      type="number"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="projectCost"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="form-group col-md-6 col-12">
                    <label htmlFor="developmentArea">Development Area</label>
                    <Field
                      name="developmentArea"
                      type="text"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="developmentArea"
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
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddProject;
