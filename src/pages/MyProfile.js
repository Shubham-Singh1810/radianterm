import React from "react";
import ProfileOverview from "../components/ProfileOverview";

function MyProfile() {
  return (
    <div className=" row m-0 p-0 mt-5 pt-5">
      <div className="col-4 ">
        <div className="mx-5">
          <div className="d-flex" style={{ cursor: "pointer" }}>
            <div className="mx-2 ">
              <b>Overview</b>
            </div>
            <div className="mx-2">Edit Profile</div>
            <div className="mx-2">Change Password</div>
            <div className="mx-2">Logout</div>
          </div>
          <hr />
          <div className="shadow p-3 text-center">
            <img
              src="https://bootstrapmade.com/demo/templates/NiceAdmin/assets/img/profile-img.jpg"
              className="img-fluid"
              style={{ height: "120px", width: "120px", borderRadius: "50%" }}
            />
            <h4 className="mb-1 mt-3">Shubham Singh</h4>
            <h6 className="text-secondary">Softwere Developer</h6>
          </div>
        </div>
      </div>
      <ProfileOverview/>
    </div>
  );
}

export default MyProfile;
