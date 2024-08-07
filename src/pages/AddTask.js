import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getProjectList, addTaskApi } from "../services/project.service";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getEmployee } from "../services/user.service";
import { useGlobalState } from "../GlobalProvider";


const validationSchema = Yup.object({
  project_id: Yup.string().required("Required"),
  empId: Yup.string().required("Required"),
  taskDescription: Yup.string().required("Required"),
  priority: Yup.string().required("Required"),
  deadline: Yup.string().required("Required"),
});

const AddTask = () => {
  const navigate = useNavigate();
  const { setGlobalState, globalState } = useGlobalState();
  const initialValues = {
    project_id: "",
    empId: globalState?.user?.role == 4 ? globalState?.user?.id : "",
    taskDescription: "",
    priority: "",
    deadline: "",
  };
  
  const handleSubmit = async (values) => {
    try {
      let response = await addTaskApi(values);
      if (response?.data?.message == "Task created successfully") {
        toast.success("Task created successfully");
      }
    } catch (error) {}
  };
  const [projectList, setProjectList] = useState([]);
  const getProjectListFunc = async () => {
    try {
      let response = await getProjectList({ status: 1 });
      setProjectList(response.data.projects);
    } catch (error) {
      console.log(error);
    }
  };
  const [userList, setUserList] = useState([]);
  const getEmployeeListFunc = async () => {
    try {
      let response = await getEmployee();
      setUserList(response.data.employees);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProjectListFunc();
    getEmployeeListFunc();
  }, []);
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
              src="https://radiantengineering.co/wp-content/uploads/2024/07/konal-nalah-dam.png"
              className="d-block w-100"
              alt="..."
              style={{ height: "300px" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://radiantengineering.co/wp-content/uploads/2024/07/Marine-Drive.png"
              className="d-block w-100"
              alt="..."
              style={{ height: "300px" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://radiantengineering.co/wp-content/uploads/2024/07/Reeli-Khola-Bridge.png"
              className="d-block w-100"
              alt="..."
              style={{ height: "300px" }}
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
        <h2 className=" text-center ">
          <b className="text-secondary shadow-sm p-1 rounded">Add New Task</b>
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="row">
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label htmlFor="project_id" className="form-label">
                    Project Name
                  </label>
                  <Field as="select" name="project_id" className="form-select">
                    <option value="" label="Select project" />
                    {projectList?.map((v, i) => {
                      return <option value={v?.id} label={v?.name} />;
                    })}
                  </Field>
                  <ErrorMessage
                    name="project_id"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
              {globalState?.user?.role != 4 && (
                <div className="col-md-6 col-12">
                  <div className="mb-3">
                    <label htmlFor="empId" className="form-label">
                      Assign To
                    </label>
                    <Field as="select" name="empId" className="form-select">
                      <option value="" label="Select employee" />
                      {userList?.map((v, i) => {
                        return <option value={v?.id} label={v?.name} />;
                      })}
                    </Field>
                    <ErrorMessage
                      name="empId"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
              )}

              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label htmlFor="priority" className="form-label">
                    Priority
                  </label>
                  <Field as="select" name="priority" className="form-select">
                    <option value="" label="Select priority" />
                    <option value="Low" label="Low" />
                    <option value="Medium" label="Medium" />
                    <option value="High" label="High" />
                  </Field>
                  <ErrorMessage
                    name="priority"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label htmlFor="deadline" className="form-label">
                    Deadline
                  </label>
                  <Field name="deadline" type="date" className="form-control" />
                  <ErrorMessage
                    name="deadline"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>

              <div className="col-md-12 col-12">
                <div className="mb-3">
                  <label htmlFor="taskDescription" className="form-label">
                    Task Description
                  </label>
                  <Field
                    name="taskDescription"
                    as="textarea"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="taskDescription"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="btn w-100 btn-primary">
              Submit
            </button>
          </Form>
        </Formik>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddTask;
