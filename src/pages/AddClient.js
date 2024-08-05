import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addClient } from "../services/user.service";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const initialValues = {
  name: "",
  website: "",
  description:"",
  
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  website: Yup.string(),
  description: Yup.string(),
});



const AddClient = () =>{
    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        try {
          let response = await addClient(values);
          if (response?.data?.message == "Client Added Successfully!") {
            toast.success(response?.data?.message);
            setTimeout(()=>{
                navigate("/view-clients")
            }, 1500)
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
          <b className="text-secondary shadow-sm p-1 rounded">Add New Client</b>
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="row">
                <div className="form-group col-6 ">
                  <label htmlFor="name">Client Name</label>
                  <Field name="name" type="text" className="form-control" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </div>
  
                <div className="form-group col-6 ">
                  <label htmlFor="website">Website</label>
                  <Field name="website" type="text" className="form-control" />
                  <ErrorMessage
                    name="website"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group col-12 ">
                  <label htmlFor="description">Discription</label>
                  <Field name="description" type="text" className="form-control" />
                  <ErrorMessage
                    name="description"
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
      <ToastContainer />
    </>
  )} ;

export default AddClient;
