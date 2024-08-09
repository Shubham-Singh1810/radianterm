import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalState } from "../GlobalProvider";
function Navbar({ setShowSideBar, showSideBar }) {
  const navigate = useNavigate();
  const { globalState } = useGlobalState();
  const renderRole = (role) => {
    if (role == "1") {
      return "Super Admin";
    } else if (role == "2") {
      return "Admin";
    } else if (role == "3") {
      return "Supervisor";
    } else {
      return "Emplyee";
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("radient_user");
    localStorage.removeItem("access_token");
    window.location.href = "https://erm.radiantengineering.co/";
  };
  return (
    <div className="d-flex align-items-center justify-content-between px-md-5 px-3 py-3 bg-light">
      <h5 className="mb-0">
        <i
          className="fa fa-bars"
          onClick={() => setShowSideBar(!showSideBar)}
        ></i>
      </h5>
      <div className="d-flex align-items-center">
        <h5 className="mb-0">
          <i className="fa fa-bell me-4"></i>
        </h5>
        <div className="dropdown ">
          <div
            className="d-flex align-items-center"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={
                "https://erm.onclicksolution.com/storage/app/public/" +
                globalState?.user?.photo
              }
              style={{ height: "35px", width: "35px", borderRadius: "50%" }}
            />
            <h5 className="mb-0 ms-2">{globalState?.user?.name}</h5>
            <i className="fa ms-1 fa-caret-down"></i>
          </div>
          <ul class="dropdown-menu mt-2" style={{ width: "200px" }}>
            <li>
              <a class="dropdown-item text-center" href="#">
                {globalState?.user?.name} <br />
                <b
                  className="text-secondary"
                  style={{
                    fontSize: "13px",
                    position: "relative",
                    top: "-5px",
                  }}
                >
                  {renderRole(globalState?.user?.role)}
                </b>
              </a>
            </li>
            <hr className="m-0" />
            <li>
              <Link class="dropdown-item" to="/my-profile">
                My Profile
              </Link>
            </li>
            <li>
              <Link class="dropdown-item" to="/edit-profile">
                Edit Profile
              </Link>
            </li>
            <li>
              <a
                class="dropdown-item text-danger"
                onClick={() => handleLogout()}
                style={{cursor:"pointer"}}
              >
                Log out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
