import React from 'react'

function ProfileOverview() {
  return (
    <div className="col-8 ">
        <div className="shadow px-5 py-3 me-5">
          <h2 className=" mb-4">
            <b>About</b>
          </h2>
          <p>
            Sunt est soluta temporibus accusantium neque nam maiores cumque
            temporibus. Tempora libero non est unde veniam est qui dolor. Ut
            sunt iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga
            sequi sed ea saepe at unde.
          </p>
          <h4 className="mb-3">Profile Details</h4>
          <div className="row">
          <div className="col-8 row">
            <div className="col-5 mb-1">
              <h5 className="text-secondary">Full Name</h5>
            </div>
            <div className="col-7 mb-1">
              <h5>Shubham Singh</h5>
            </div>
            <div className="col-5 mb-1">
              <h5 className="text-secondary">Contact</h5>
            </div>
            <div className="col-7 mb-1">
              <h5>7762042085</h5>
            </div>
            <div className="col-5 mb-1">
              <h5 className="text-secondary">Email</h5>
            </div>
            <div className="col-7 mb-1">
              <h5>hittheshubham1810@gmail.com</h5>
            </div>
            <div className="col-5 mb-1">
              <h5 className="text-secondary">Role</h5>
            </div>
            <div className="col-7 mb-1">
              <h5>Admin</h5>
            </div>
            <div className="col-5 mb-1">
              <h5 className="text-secondary">Designation</h5>
            </div>
            <div className="col-7 mb-1">
              <h5>Softwere Developer</h5>
            </div>
            <div className="col-5 mb-1">
              <h5 className="text-secondary">Department</h5>
            </div>
            <div className="col-7 mb-1">
              <h5>IT</h5>
            </div>
            <div className="col-5 mb-1">
              <h5 className="text-secondary">UAN No.</h5>
            </div>
            <div className="col-7 mb-1">
              <h5>1234567890</h5>
            </div>
            <div className="col-5 mb-1">
              <h5 className="text-secondary">ESI No.</h5>
            </div>
            <div className="col-7 mb-1">
              <h5>1234567890</h5>
            </div>
            <div className="col-5 mb-1">
              <h5 className="text-secondary">Highest Education</h5>
            </div>
            <div className="col-7 mb-1">
              <h5>B.C.A </h5>
            </div>
            <div className="col-5 mb-1">
              <h5 className="text-secondary">Joining Date</h5>
            </div>
            <div className="col-7 mb-1">
              <h5>12/12/2024</h5>
            </div>
          </div>
          <div className="col-4 custom-scrollbar" style={{height:"400px", overflowY:"auto", overflowX:"hidden"}}>
          {
            [1, 2, 3,].map((v, i)=>{
                return(
                    <div className="mb-3">
                        <img src="https://radiantengineering.co/wp-content/uploads/2021/11/WG_1-300x169.jpg" className="img-fluid"/>
                        <p>Card No. {i+1}</p>
                    </div>
                )
            })
          }
          </div>
          </div>
          
        </div>
      </div>
  )
}

export default ProfileOverview