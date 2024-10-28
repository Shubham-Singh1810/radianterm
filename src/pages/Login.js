import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // Optional: For validation schema
import { login, resetPassword } from "../services/user.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalState } from "../GlobalProvider";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const { setGlobalState, globalState } = useGlobalState();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      contact: "",
      password: "",
    },
    validationSchema: Yup.object({
      contact: Yup.string()
        .required("User Name is requird field")
        .matches(/^[0-9]{10}$/, "contact must be of 10 digits"),
      password: Yup.string().required("Password is required field"),
    }),
    onSubmit: async (values) => {
      try {
        let response = await login(values);
        if (response?.data?.message == "User Logged In Successfully!") {
          toast.success(response?.data?.message);
          setTimeout(() => {
            localStorage.setItem(
              "radient_user",
              JSON.stringify(response?.data?.user)
            );
            localStorage.setItem("access_token", response?.data?.access_token);
            setGlobalState({
              ...globalState,
              user: response.data.user,
              access_token: response.data.access_token,
            });
            navigate("/");
          }, 500);
        } else {
          toast.error(response?.data?.message);
        }
      } catch (error) {
        toast.error("Internal Server Error");
      }
    },
  });
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [email, setEmail] = useState("");
  const sendCredintials = async () => {
    try {
      let response = await resetPassword({ email: email });
      if (
        response?.data?.message ==
        "A new password has been sent to your email address."
      ) {
        toast.success("A new password has been sent to your email address.");
        setShowResetPassword(false);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error(error?.response?.data?.error?.email[0]);
    }
  };
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      {showResetPassword ? (
        <div className="customShadow p-5">
          <img
            src="https://radiantengineering.co/wp-content/uploads/2021/11/radiant-logo-3.png"
            alt="Logo"
          />
          <h5 className="text-center mt-3 mb-4">Reset Password</h5>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label>Email</label>
              <input
                className="form-control mb-3 mt-1"
                name="contact"
                placeholder="Type your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
              />
            </div>
            <div></div>
            <button
              onClick={sendCredintials}
              className="btn btn-primary w-100 mt-3"
            >
              Submit
            </button>
          </form>
          <div className="d-flex justify-content-center my-2">
            <p>
              <b
                onClick={() => setShowResetPassword(false)}
                style={{ cursor: "pointer", textDecoration: "underline" }}
              >
                Login
              </b>
            </p>
          </div>
        </div>
      ) : (
        <div className="customShadow p-5">
          <img
            src="https://radiantengineering.co/wp-content/uploads/2021/11/radiant-logo-3.png"
            alt="Logo"
          />
          <h5 className="text-center mt-3 mb-4">Welcome Back</h5>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label>User Name</label>
              <input
                className="form-control mb-3 mt-1"
                name="contact"
                placeholder="Type your username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.contact}
              />
              {formik.touched.contact && formik.errors.contact ? (
                <div
                  className="text-danger"
                  style={{
                    fontSize: "12px",
                    marginTop: "-15px",
                    marginBottom: "10px",
                  }}
                >
                  {formik.errors.contact}
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
              Login
            </button>
          </form>
          <div className="d-flex justify-content-center my-2">
            <p>
              <b
                onClick={() => setShowResetPassword(true)}
                style={{ cursor: "pointer", textDecoration: "underline" }}
              >
                Reset Password
              </b>
            </p>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Login;
