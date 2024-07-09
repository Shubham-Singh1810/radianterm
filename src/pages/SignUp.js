import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // Optional: For validation schema

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("User Name is requird field"),
      password: Yup.string().required("Password is required field"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="shadow p-5">
        <img
          src="https://radiantengineering.co/wp-content/uploads/2021/11/radiant-logo-3.png"
          alt="Logo"
        />
        <h5 className="text-center mt-3 mb-4">Create An Account</h5>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label>User Name</label>
            <input
              className="form-control mb-3 mt-1"
              name="username"
              placeholder="Type your username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div
                className="text-danger"
                style={{
                  fontSize: "12px",
                  marginTop: "-15px",
                  marginBottom: "10px",
                }}
              >
                {formik.errors.username}
              </div>
            ) : null}
          </div>
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <label>Password</label>
              <i
                onClick={() => setShowPassword(!showPassword)}
                className={showPassword ? "fa fa-eye-slash" : " fa fa-eye"}
                style={{ position: "relative", top: "3px" }}
              ></i>
            </div>

            <input
              className="form-control mb-3 mt-1"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Type your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />

            {formik.touched.password && formik.errors.password ? (
              <div
                className="text-danger"
                style={{
                  fontSize: "12px",
                  marginTop: "-15px",
                  marginBottom: "10px",
                }}
              >
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Register
          </button>
          <p
            className="mt-5 mb-0 text-center"
            style={{ fontSize: "14px", fontWeight: "400" }}
          >
            Already have an account? <br /> <a href="">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
