import React, {useState} from "react";
import { Route, Routes } from "react-router-dom";
import SuperDashboard from "../pages/SuperDashboard";
import AddEmployee from "../pages/AddEmployee";
import MyProfile from "../pages/MyProfile";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ViewAdmin from "../pages/ViewAdmin";
import ViewSuperviser from "../pages/ViewSuperviser";
import ViewEmployee from "../pages/ViewEmployee";
import EditProfile from "../pages/EditProfile";
function AdminLayout() {
  const [navItem, setNavItem] = useState([
   
    {
      heading: "Supervisor",
      item: [
        // {
        //   name: "Add Supervisor",
        //   path: "/current-projects",
        // },
        {
          name: "View Supervisor",
          path: "/view-superviser",
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
          path: "/view-employee",
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
  return (
    <div className="d-flex">
      <Sidebar navItem={navItem} setNavItem={setNavItem}/>
      <div style={{ width: "80%" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<SuperDashboard />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/view-admin" element={<ViewAdmin />} />
          <Route path="/view-superviser" element={<ViewSuperviser />} />
          <Route path="/view-employee" element={<ViewEmployee />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </div>
    </div>
  );
  return (
    <Routes>
      <Route path="/" element={<SuperDashboard />} />
      <Route path="/add-employee" element={<AddEmployee />} />
      <Route path="/my-profile" element={<MyProfile />} />
    </Routes>
  );
}

export default AdminLayout;
