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
import MarkLeaveApplication from "../pages/MarkLeaveApplication";
import AddTask from "../pages/AddTask";
import ViewTask from "../pages/ViewTask";
import ViewTeamMembers from "../pages/ViewTeamMembers";
import FutureProject from "../pages/FutureProject";
import CurrentProject from "../pages/CurrentProject";
import CompletedProject from "../pages/CompletedProject";
import PartiallyCompletedProject from "../pages/PartiallyCompletedProject";
import EmployeeReport from "../pages/EmployeeReport";
import ViewEmployeeById from "../pages/ViewEmployeeById";
import EditProject from "../pages/EditProject";
import EditEmployeeById from "../pages/EditEmployeeById";
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
      heading: "Team Leader",
      item: [
        
        {
          name: "View Team Leaders",
          path: "/view-tl",
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
        {
          name: "Employees Report",
          path: "/employee-report",
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
          name: "View Task",
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
      <div style={{ width: showSideBar && window.innerWidth> 500 ? "80%" : "100%", height:"100vh", overflow:"auto" }}>
        <Navbar setShowSideBar={setShowSideBar} showSideBar={showSideBar} />
        <Routes>
          <Route path="/" element={<SuperDashboard />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/view-admin" element={<ViewAdmin />} />
          <Route path="/view-tl" element={<ViewSuperviser />} />
          <Route path="/view-employee" element={<ViewEmployee />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/add-projects" element={<AddProject />} />
          <Route path="/add-client" element={<AddClient />} />
          <Route path="/view-clients" element={<ViewClients />} />
          <Route path="/edit-project/:id" element={<EditProject />} />
          <Route path="/current-projects" element={<CurrentProject />} />
          <Route path="/future-projects" element={<FutureProject />} />
          <Route path="/completed-projects" element={<CompletedProject />} />
          <Route path="/partially-completed-projects" element={<PartiallyCompletedProject />} />
          <Route path="/mark-leave-application" element={<MarkLeaveApplication />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/view-task" element={<ViewTask />} />
          <Route path="/view-members" element={<ViewTeamMembers />} />
          <Route path="/employee-report/:id" element={<EmployeeReport />} />
          <Route path="/employee-report" element={<EmployeeReport />} />
          <Route path="/employee/:id" element={<ViewEmployeeById />} />
          <Route path="/employee-edit/:id" element={<EditEmployeeById />} />
        </Routes>
      </div>
    </div>
  );
  
}

export default SuperAdminLayout;
