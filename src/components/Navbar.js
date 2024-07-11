import React from "react";
import {Link} from "react-router-dom"
function Navbar() {
  return (
    <div className="d-flex align-items-center justify-content-between px-5 py-3 bg-light">
      <h5 className="mb-0">
        <i className="fa fa-bars"></i>
      </h5>
      <div className="d-flex align-items-center">
        <h5 className="mb-0">
          <i className="fa fa-bell me-4"></i>
        </h5>
        <div className="dropdown ">
          <div className="d-flex align-items-center"  href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <img
            src="https://bootstrapmade.com/demo/templates/NiceAdmin/assets/img/profile-img.jpg"
            style={{ height: "35px", width: "35px", borderRadius: "50%" }}
          />
          <h5 className="mb-0 ms-2">Shubham Singh</h5>
          <i className="fa ms-1 fa-caret-down"></i>
          </div>
          <ul class="dropdown-menu mt-2" style={{width:"200px"}}>
            <li>
              <a class="dropdown-item text-center" href="#">
              Shubham Singh <br/>
              <b className="text-secondary" style={{fontSize:"13px", position:"relative", top:"-5px"}}>Admin</b>
              </a>
            </li>
            <hr className="m-0"/>
            <li>
              <Link class="dropdown-item" to="/my-profile">
                My Profile
              </Link>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Edit Profile
              </a>
            </li>
            <li>
              <a class="dropdown-item" onClick={()=>window.location.reload()}>
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
