import React from "react";
import ProfileOverview from "../components/ProfileOverview";
import {useGlobalState} from "../GlobalProvider";
import {useNavigate} from "react-router-dom";
function MyProfile() {
  const navigate = useNavigate()
  const {globalState}= useGlobalState();
  return (
    <div className=" row m-0 p-0 mt-5 pt-md-5">
      <div className="col-md-4 col-12">
        <div className="mx-md-5">
          <div className="d-flex" style={{ cursor: "pointer" }}>
            <div className="mx-2 ">
              <b>Overview</b>
            </div>
            <div className="mx-2" onClick={()=>{navigate("/edit-profile")}}>Edit Profile</div>
            {/* <div className="mx-2">Change Password</div> */}
            <div className="mx-2" onClick={()=>{localStorage.removeItem("radient_user"); localStorage.removeItem("access_token"); window.location.reload()}}>Logout</div>
          </div>
          <hr />
          <div className="shadow p-3 text-center">
            <img
              src={"https://ermbackend.radiantengineering.co/storage/app/public/"+globalState?.user?.photo}
              className="img-fluid"
              style={{ height: "120px", width: "120px", borderRadius: "50%" }}
            />
            <h4 className="mb-1 mt-3">{globalState?.user?.name}</h4>
            <h6 className="text-secondary">{globalState?.user?.designation}</h6>
          </div>
          <div className="mt-2">
            <a className="btn btn-primary btn-sm m-1" target="blank" href={"https://ermbackend.radiantengineering.co/storage/app/public/"+globalState?.user?.pan} style={{textDecoration:"none", color:"white"}} >Pan Card</a>
            <a className="btn btn-info btn-sm m-1" target="blank" href={"https://ermbackend.radiantengineering.co/storage/app/public/"+globalState?.user?.passbook} style={{textDecoration:"none", color:"white"}} >Bank Passbook</a>
            <a className="btn btn-warning btn-sm m-1" target="blank" href={"https://ermbackend.radiantengineering.co/storage/app/public/"+globalState?.user?.aadhar} style={{textDecoration:"none", color:"white"}} >Aadhar Card</a>
            <a className="btn btn-success btn-sm m-1" target="blank" href={"https://ermbackend.radiantengineering.co/storage/app/public/"+globalState?.user?.offerLetter} style={{textDecoration:"none", color:"white"}} >Offer Letter</a>
            
          </div>
        </div>
      </div>
      <ProfileOverview/>
    </div>
  );
}

export default MyProfile;
