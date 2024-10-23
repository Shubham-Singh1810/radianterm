import React, { useEffect, useState } from "react";
import { getEmployeeById } from "../services/user.service";
import { useGlobalState } from "../GlobalProvider";
import { useNavigate, useParams } from "react-router-dom";
function ViewEmployeeById() {
  const navigate = useNavigate();
  const params = useParams()
  const { globalState } = useGlobalState();
  const [userDetails, setUserDetails]=useState("")
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
  const employeByIdFunc = async () => {
    try {
        let response = await getEmployeeById(params?.id)
        console.log(response?.data?.user)
        setUserDetails(response?.data?.user)
    } catch (error) {}
  };
  useEffect(()=>{
    employeByIdFunc()
  },[])
  return (
    <div className=" row m-0 p-0 mt-5 pt-md-5">
      <div className="col-md-4 col-12">
        <div className="mx-md-5">
          <div className="d-flex" style={{ cursor: "pointer" }}>
            <div className="mx-2 ">
              <b>Overview</b>
            </div>
          </div>
          <hr />
          <div className="shadow p-3 text-center">
            <img
              src={
                "https://ermbackend.radiantengineering.co/storage/app/public/" +
                userDetails?.photo
              }
              className="img-fluid"
              style={{ height: "120px", width: "120px", borderRadius: "50%" }}
            />
            <h4 className="mb-1 mt-3">{userDetails?.name}</h4>
            <h6 className="text-secondary">{userDetails?.designation}</h6>
          </div>
          <div className="mt-2">
            {userDetails?.pan && <a
              className="btn btn-primary btn-sm m-1"
              target="blank"
              href={
                "https://ermbackend.radiantengineering.co/storage/app/public/" +
                userDetails?.pan
              }
              style={{ textDecoration: "none", color: "white" }}
            >
              Pan Card
            </a>}
            {userDetails?.passbook && <a
              className="btn btn-info btn-sm m-1"
              target="blank"
              href={
                "https://ermbackend.radiantengineering.co/storage/app/public/" +
                userDetails?.passbook
              }
              style={{ textDecoration: "none", color: "white" }}
            >
              Bank Passbook
            </a>}
            {userDetails?.aadhar && <a
              className="btn btn-warning btn-sm m-1"
              target="blank"
              href={
                "https://ermbackend.radiantengineering.co/storage/app/public/" +
                userDetails?.aadhar
              }
              style={{ textDecoration: "none", color: "white" }}
            >
              Aadhar Card
            </a>}
            {
              userDetails?.offerLetter && <a
              className="btn btn-success btn-sm m-1"
              target="blank"
              href={
                "https://ermbackend.radiantengineering.co/storage/app/public/" +
                userDetails?.offerLetter
              }
              style={{ textDecoration: "none", color: "white" }}
            >
              Offer Letter
            </a>
            }
            
          </div>
        </div>
      </div>
      <div className="col-md-8  col-12">
        <div className="shadow px-md-5 px-3 py-3 mt-3 mt-md-0 me-md-5">
          <h2 className=" mb-4">
            <b>About</b>
          </h2>
          <p>{userDetails?.about}</p>
          <h4 className="mb-3">Profile Details</h4>
          <div className="row">
            <div className="col-10 row">
              <div className="col-5 ">
                <p className="text-secondary mb-1">Full Name</p>
              </div>
              <div className="col-7 ">
                <p className="mb-1">{userDetails?.name}</p>
              </div>
              <div className="col-5 ">
                <p className="text-secondary mb-1">Contact</p>
              </div>
              <div className="col-7">
                <p className="mb-1">{userDetails?.contact}</p>
              </div>
              <div className="col-5 ">
                <p className="text-secondary mb-1">Email</p>
              </div>
              <div className="col-7 ">
                <p className="mb-1">{userDetails?.email}</p>
              </div>
              <div className="col-5 ">
                <p className="text-secondary mb-1">D.O.B</p>
              </div>
              <div className="col-7 ">
                <p className="mb-1">{userDetails?.dob}</p>
              </div>
              <div className="col-5 ">
                <p className="text-secondary mb-1">Role</p>
              </div>
              <div className="col-7">
                <p className="mb-1">{renderRole(userDetails?.role)}</p>
              </div>
              <div className="col-5 ">
                <p className="text-secondary mb-1">Designation</p>
              </div>
              <div className="col-7 ">
                <p className="mb-1">{userDetails?.designation}</p>
              </div>
              <div className="col-5 ">
                <p className="text-secondary mb-1">Department</p>
              </div>
              <div className="col-7">
                <p className="mb-1">{userDetails?.department}</p>
              </div>
              <div className="col-5">
                <p className="text-secondary mb-1">UAN No.</p>
              </div>
              <div className="col-7">
                <p className="mb-1">{userDetails?.PFNO}</p>
              </div>
              <div className="col-5">
                <p className="text-secondary mb-1">ESI No.</p>
              </div>
              <div className="col-7">
                <p className="mb-1">{userDetails?.ESINO}</p>
              </div>
              <div className="col-5">
                <p className="text-secondary mb-1">Highest Education</p>
              </div>
              <div className="col-7">
                <p className="mb-1">{userDetails?.education} </p>
              </div>
              <div className="col-5">
                <p className="text-secondary mb-1">Joining Date</p>
              </div>
              <div className="col-7">
                <p className="mb-0">{userDetails?.joiningDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewEmployeeById;
