import React, { useState } from "react";
import {useNavigate, useNavigation} from "react-router-dom"
function Sidebar() {
  const navigate = useNavigate()
  const [navItem, setNavItem] = useState([
    {
      heading: "Admin",
      item: [
        // {
        //   name: "Add Admin",
        //   path: "/add-employee",
        // },
        {
          name: "View Admin",
          path: "/view",
        },
      ],
      showDropDown: false,
    },
    {
      heading: "Supervisor",
      item: [
        // {
        //   name: "Add Supervisor",
        //   path: "/current-projects",
        // },
        {
          name: "View Supervisor",
          path: "/current-projects",
        },
      ],
      showDropDown: false,
    },
    {
      heading: "Employee",
      item: [
        {
          name: "Add Employee",
          path: "/add-employee",
        },
        {
          name: "View Employees",
          path: "/add-employee",
        },
      ],
      showDropDown: false,
    },

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
      showDropDown: false,
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
      showDropDown: false,
    },
    {
      heading: "Attendence",
      item: [
        {
          name: "Attendence Report",
          path: "/current-projects",
        },
        {
          name: "View Leave Application",
          path: "/current-projects",
        },
      ],
      showDropDown: false,
    },
  ]);
  const toggleDropdown = (index) => {
    const updatedNavItem = navItem.map((item, i) =>
      i === index ? { ...item, showDropDown: !item.showDropDown } : item
    );
    setNavItem(updatedNavItem);
  };
  return (
    <div style={{ width: "20%", background: "whitesmoke" }} className="vh-100">
      <div className="p-2 d-flex justify-content-center">
        <img
          src="https://radiantengineering.co/wp-content/uploads/2021/11/radiant-logo-3.png"
          alt="Logo"
          className="img-fluid"
        />
      </div>
      <hr />
      <div>
        {navItem?.map((v, i) => {
          return (
            <div className="mx-4 mt-4">
              <h5
                className="mb-3 text-secondary d-flex justify-content-between align-items-center"
                onClick={() => toggleDropdown(i)}
                style={{ cursor: "pointer" }}
              >
                {" "}
                <span>{v?.heading}</span>{" "}
                <i
                  className={
                    "fa " +
                    (!v.showDropDown ? " fa-caret-down" : " fa-caret-up")
                  }
                ></i>
              </h5>
              <div className="ms-3">
                {v?.item?.map((value, i) => {
                  if (v?.showDropDown) {
                    return (
                      <p
                        className="mb-2 d-flex align-items-center"
                        style={{ cursor: "pointer" }}
                        onClick={()=>navigate(value?.path)}
                      >
                        <i
                          className="fa fa-circle-o me-2"
                          style={{ fontSize: "10px" }}
                        ></i>{" "}
                        <b>
                          <a>{value?.name}</a>
                        </b>
                      </p>
                    );
                  }
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
