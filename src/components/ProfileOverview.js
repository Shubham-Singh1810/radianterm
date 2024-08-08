import React from 'react'
import {useGlobalState} from "../GlobalProvider"
function ProfileOverview() {
  const renderRole = (role)=>{
    if(role=="1"){
      return(
        "Super Admin"
      )
    }else if(role=="2"){
      return(
        "Admin"
      )
    }else if(role=="3"){
      return(
        "Supervisor"
      )
    }else{
      return (
        "Emplyee"
      )
    }
  }
  const {globalState}= useGlobalState();
  return (
    <div className="col-md-8  col-12">
        <div className="shadow px-md-5 px-3 py-3 mt-3 mt-md-0 me-md-5">
          <h2 className=" mb-4">
            <b>About</b>
          </h2>
          <p>
            {globalState?.user?.about}
          </p>
          <h4 className="mb-3">Profile Details</h4>
          <div className="row">
          <div className="col-10 row" >
            <div className="col-5 ">
              <p className="text-secondary mb-1">Full Name</p>
            </div>
            <div className="col-7 ">
              <p className='mb-1'>{globalState?.user?.name}</p>
            </div>
            <div className="col-5 ">
              <p className="text-secondary mb-1">Contact</p>
            </div>
            <div className="col-7">
              <p className='mb-1'>{globalState?.user?.contact}</p>
            </div>
            <div className="col-5 ">
              <p className="text-secondary mb-1">Email</p>
            </div>
            <div className="col-7 ">
              <p className='mb-1'>{globalState?.user?.email}</p>
            </div>
            <div className="col-5 ">
              <p className="text-secondary mb-1">D.O.B</p>
            </div>
            <div className="col-7 ">
              <p className='mb-1'>{globalState?.user?.dob}</p>
            </div>
            <div className="col-5 ">
              <p className="text-secondary mb-1">Role</p>
            </div>
            <div className="col-7">
              <p className='mb-1'>{renderRole(globalState?.user?.role)}</p>
            </div>
            <div className="col-5 ">
              <p className="text-secondary mb-1">Designation</p>
            </div>
            <div className="col-7 ">
              <p className='mb-1'>{globalState?.user?.designation}</p>
            </div>
            <div className="col-5 ">
              <p className="text-secondary mb-1">Department</p>
            </div>
            <div className="col-7">
              <p className='mb-1'>{globalState?.user?.department}</p>
            </div>
            <div className="col-5">
              <p className="text-secondary mb-1">UAN No.</p>
            </div>
            <div className="col-7">
              <p className='mb-1'>{globalState?.user?.PFNO}</p>
            </div>
            <div className="col-5">
              <p className="text-secondary mb-1">ESI No.</p>
            </div>
            <div className="col-7">
              <p className='mb-1'>{globalState?.user?.ESINO}</p>
            </div>
            <div className="col-5">
              <p className="text-secondary mb-1">Highest Education</p>
            </div>
            <div className="col-7">
              <p className='mb-1'>{globalState?.user?.education} </p>
            </div>
            <div className="col-5">
              <p className="text-secondary mb-1">Joining Date</p>
            </div>
            <div className="col-7">
              <p className='mb-0'>{globalState?.user?.joiningDate}</p>
            </div>
          </div>
         
          </div>
          
        </div>
      </div>
  )
}

export default ProfileOverview