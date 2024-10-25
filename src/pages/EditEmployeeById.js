import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useGlobalState } from "../GlobalProvider";
import { editEmployeeByAdmin, getEmployeeById } from "../services/user.service";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"; // Import styles

const EditEmployeeById = () => {
  const { setGlobalState, globalState } = useGlobalState();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const params = useParams();
  const navigate = useNavigate();

  // Fetch employee data by ID
  const fetchEmployeeById = async () => {
    try {
      const response = await getEmployeeById(params?.id);
      setUserDetails(response?.data?.user);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch employee details.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeById();
  }, [params?.id]);

  const validationSchema = Yup.object({
    
    officeLocation: Yup.string().required("Office location is required"),
    department: Yup.string().required("Department is required"),
    
  });

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("department", values?.department);
      formData.append("designation", values?.designation);
      formData.append("jobStatus", values?.jobStatus);
      formData.append("officeLocation", values?.officeLocation);
      formData.append("id", values?.id);
      const response = await editEmployeeByAdmin(userDetails.id,formData);
      if (response?.data?.message === "Employee updated successfully!") {
        toast.success(response?.data?.message);
        setTimeout(() => {
          navigate("/view-employee");
        }, 1500);
      }
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };



  return (
    <div className="container p-md-5 p-2 mt-3 editForm">
      <h2 className="text-center">Edit Profile - {userDetails?.name}</h2>
      <Formik
        initialValues={userDetails}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize // Important to reload form with new initial values
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="row">
              <div className="col-lg-6 d-flex align-items-center justify-content-center col-12">
                <img
                  src={
                    "https://ermbackend.radiantengineering.co/storage/app/public/" +
                    userDetails?.photo
                  }
                  style={{
                    height: "200px",
                    width: "200px",
                    borderRadius: "50%",
                  }}
                  className="border p-2"
                />
              </div>

              <div className="row col-6">
                <div className="form-group  col-12">
                  <label htmlFor="designation">Designation</label>
                  <Field
                    name="designation"
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="form-group  col-12">
                  <label htmlFor="department">Department</label>
                  <Field
                    name="department"
                    type="text"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="department"
                    component="div"
                    className="text-danger"
                  />
                </div>
                
                <div className="form-group col-12">
                  <label htmlFor="jobStatus">Job Status</label>
                  <Field as="select" name="jobStatus" className="form-control">
                    <option value="" disabled>
                      Select Job Status
                    </option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Field>
                  <ErrorMessage
                    name="jobStatus"
                    component="div"
                    className="text-danger"
                  />
                </div>
                
                <div className="form-group  col-12">
                  <label htmlFor="officeLocation">Office Location</label>
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
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-4">
                Update
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default EditEmployeeById;
