import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  addProject,
  getProjectById,
  editProjectData,
} from "../services/project.service";
import { getClients } from "../services/user.service";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  client: Yup.string().required("Required"),
  location: Yup.string().required("Required"),

  status: Yup.string().required("Required"),
  projectType: Yup.string().required("Required"),
  
});

const EditProject = () => {
  const navigate = useNavigate();
  const [clientList, setClientList] = useState();
  const params = useParams();
  const [initialValues, setInitialValues] = useState({
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
    projectNature:"",
    projectScope:""
  });
  const getClientsList = async () => {
    try {
      let response = await getClients();
      console.log(response);
      setClientList(response?.data?.clients);
    } catch (error) {}
  };
  const getProjectDetails = async () => {
    try {
      let response = await getProjectById(params?.id);
      const { projectScope, ...projectData } = response?.data?.project; // Exclude projectScope
    setInitialValues({ projectScope: "", ...projectData }); 
    } catch (error) {}
  };
  useEffect(() => {
    getClientsList();
    getProjectDetails();
  }, []);
  const handleSubmit = async (values) => {
    try {
      let response = await editProjectData(params.id, values);
      if (response?.data?.message == "Project updated successfully!") {
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
      <div className="container my-5  editForm">
        <div
          style={{ background: "ghostwhite" }}
          className="p-3 rounded shadow"
        >
          <h2 className=" text-center ">
            <b className="text-secondary  p-1 ">Edit Project</b>
          </h2>
          <Formik
            initialValues={initialValues}
            enableReinitialize
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
                      <option value="Architecture">
                        Architecture
                      </option>
                      <option value="Townplanning">
                      Townplanning
                      </option>
                      <option value="Dam">
                      Dam
                      </option>
                      <option value="Drainage">
                      Drainage
                      </option>
                      <option value="Sewerage">
                      Sewerage
                      </option>
                      <option value="PHE">PHE</option>
                      <option value="Transportation">Transportation</option>
                      <option value="Interior Design">Interior Design</option>
                      <option value="Landscape Design">Landscape Design</option>
                      <option value="Offshore Structures">
                        Offshore Structures
                      </option>
                      <option value="Execution">Execution</option>
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
                      
                      <option value="Supervision/PMC/IEC/SQC/IEC-HRD/ISA/DPMU">Supervision/PMC/IEC/SQC/IEC-HRD/ISA/DPMU</option>
                      <option value="EPC">EPC</option>
                      <option value="Turnkey">Turnkey</option>
                      <option value="Advisory">Advisory</option>
                      
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
                      type="text"
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

export default EditProject;
