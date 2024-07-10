import React from "react";

function Navbar() {
  return (
    <div className="d-flex align-items-center justify-content-between px-5 py-3 bg-light">
      <h5 className="mb-0">
        <i className="fa fa-bars"></i>
      </h5>
      <div className="d-flex align-items-center">
        <h5 className="mb-0"><i className="fa fa-bell me-4"></i></h5>
        <div className="d-flex align-items-center">
          <img src="https://bootstrapmade.com/demo/templates/NiceAdmin/assets/img/profile-img.jpg" style={{height:"35px", width:"35px", borderRadius:"50%"}}/>
          <h5 className="mb-0 ms-2">Shubham Singh</h5>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
