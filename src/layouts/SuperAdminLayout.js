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
import AddProject from "../pages/AddProject";
import AddClient from "../pages/AddClient";
import ViewClients from "../pages/ViewClients";
import CurrentProject from "../pages/CurrentProject";
import MarkLeaveApplication from "../pages/MarkLeaveApplication";
import AddTask from "../pages/AddTask";
import ViewTask from "../pages/ViewTask";
import ViewTeamMembers from "../pages/ViewTeamMembers";
import FutureProject from "../pages/FutureProject";
import CompletedProject from "../pages/CompletedProject";
import PartiallyCompletedProject from "../pages/PartiallyCompletedProject";
function SuperAdminLayout() {
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
          path: "/view-admin",
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
          name: "Add Project",
          path: "/add-projects",
        },
        {
          name: "Current Project",
          path: "/current-projects",
        },
        {
          name: "Future Project",
          path: "/future-projects",
        },
        {
          name: "Partially Completed",
          path: "/partially-completed-projects",
        },
        {
          name: "Completed Project",
          path: "/completed-projects",
        },
      ],
      showDropDown: false,
    },
    {
      heading: "Client",
      item: [
        {
          name: "Add Client",
          path: "/add-client",
        },
        {
          name: "View Clients",
          path: "/view-clients",
        },
       
      ],
      showDropDown: false,
    },
    {
      heading: "Teams",
      item: [
        {
          name: "View Members",
          path: "/view-members",
        },
      ],
      showDropDown: false,
    },
    {
      heading: "Leave",
      item: [
        {
          name: "View Applications",
          path: "/mark-leave-application",
        },
       
      ],
      showDropDown: false,
    },
    {
      heading: "Task",
      item: [
        {
          name: "Add Task",
          path: "/add-task",
        },
        {
          name: "View Report",
          path: "/view-task",
        },
      ],
      showDropDown: false,
    },
  ]);
  const [showSideBar, setShowSideBar] = useState(
    window.innerWidth > 500 ? true : false
  );

  return (
    <div className="d-flex">
       {showSideBar && <Sidebar setShowSideBar={setShowSideBar} showSideBar={showSideBar} navItem={navItem} setNavItem={setNavItem} />}
      <div style={{ width: showSideBar && window.innerWidth> 500 ? "80%" : "100%" }}>
        <Navbar setShowSideBar={setShowSideBar} showSideBar={showSideBar} />
        <Routes>
          <Route path="/" element={<SuperDashboard />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/view-admin" element={<ViewAdmin />} />
          <Route path="/view-superviser" element={<ViewSuperviser />} />
          <Route path="/view-employee" element={<ViewEmployee />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/add-projects" element={<AddProject />} />
          <Route path="/add-client" element={<AddClient />} />
          <Route path="/view-clients" element={<ViewClients />} />
          <Route path="/current-projects" element={<CurrentProject />} />
          <Route path="/future-projects" element={<FutureProject />} />
          <Route path="/completed-projects" element={<CompletedProject />} />
          <Route path="/partially-completed-projects" element={<PartiallyCompletedProject />} />
          <Route path="/mark-leave-application" element={<MarkLeaveApplication />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/view-task" element={<ViewTask />} />
          <Route path="/view-members" element={<ViewTeamMembers />} />
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

export default SuperAdminLayout;
