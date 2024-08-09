import React, { useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";

function Sidebar({ navItem, setNavItem, showSideBar, setShowSideBar }) {
  const navigate = useNavigate();

  const toggleDropdown = (index) => {
    const updatedNavItem = navItem.map((item, i) =>
      i === index ? { ...item, showDropDown: !item.showDropDown } : item
    );
    setNavItem(updatedNavItem);
  };
  return (
    <div className="vh-100 sideBar">
      <div
        className="p-2 d-flex justify-content-center"
        onClick={() => navigate("/")}
      >
        <img
          src="https://radiantengineering.co/wp-content/uploads/2021/11/radiant-logo-3.png"
          alt="Logo"
          className="img-fluid"
        />
      </div>
      <hr />
      <div>
        {window.innerWidth <= 500 && (
          <h1 className="me-4 d-flex text-danger  justify-content-end">
            <i
              onClick={() => setShowSideBar(false)}
              className="fa fa-close border rounded px-1 shadow-sm"
            ></i>
          </h1>
        )}
        <h5
          className="mb-3 mx-4 mt-4 text-secondary d-flex justify-content-between align-items-center"
          onClick={() =>{setShowSideBar(window.innerWidth<=500 ? false: true); navigate("/")} }
          style={{ cursor: "pointer" }}
        >
          {" "}
          <span>Dashboard</span>{" "}
          
        </h5>
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
                        onClick={() => {
                          value?.popup
                            ? value?.popup(true)
                            : navigate(value?.path);
                            setShowSideBar(window.innerWidth<=500 ? false: true)
                        }}
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
