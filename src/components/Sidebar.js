import React from "react";

function Sidebar() {
  const navItem = [
    {
      heading: "Projects",
      item: [
        {
          name: "Current Project",
          path: "/current-projects",
        },
        {
          name: "Future Project",
          path: "/current-projects",
        },
        {
          name: "Completed Project",
          path: "/current-projects",
        },
      ],
    },
    {
        heading: "Attendence",
        item: [
          {
            name: "Mark Attendence",
            path: "/current-projects",
          },
          {
            name: "Attendence Report",
            path: "/current-projects",
          },
          {
            name: "Apply for leave",
            path: "/current-projects",
          },
        ],
      },
      {
        heading: "Teams",
        item: [
          {
            name: "View All Members",
            path: "/current-projects",
          },
          {
            name: "Project Vise Team",
            path: "/current-projects",
          },
        ],
      },
  ];
  return (
    <div style={{ width: "16%", background: "whitesmoke" }} className="vh-100">
      <div className="p-2 d-flex justify-content-center">
        <img
          src="https://radiantengineering.co/wp-content/uploads/2021/11/radiant-logo-3.png"
          alt="Logo"
        />
      </div>
      <hr/>
      <div>
        {navItem?.map((v, i) => {
          return (
            <div className="mx-4 mt-4">
              <h5 className="mb-3 text-secondary"> {v?.heading}</h5>
              <div className="ms-3">
              {v?.item?.map((v, i)=>{
                return(
                    <p className="mb-2 d-flex align-items-center">
                       <i className="fa fa-circle-o me-2" style={{fontSize:"10px"}}></i> <b><a>{v?.name}</a></b>
                    </p>
                )
              })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
