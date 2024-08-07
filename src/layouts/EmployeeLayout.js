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
import EmployeeDashboard from "../pages/EmployeeDashboard";
import ViewLeaveApplicationList from "../pages/ViewLeaveApplicationList"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import {applyLeaveApplication} from "../services/user.service"
import { useGlobalState } from "../GlobalProvider";
import { ToastContainer, toast } from "react-toastify";
import AddTask from "../pages/AddTask";
import ViewTask from "../pages/ViewTask";
function EmployeeLayout() {
  const { globalState } = useGlobalState();
  const [applicationForm, setApplicationForm]=useState(false);
  const [dates, setDates] = useState([]);
  const [datesCalender, setDatesCalender] = useState([]);
  const [navItem, setNavItem] = useState([
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
      heading: "Leave",
      item: [
        {
          name: "Apply for leave",
          popup: setApplicationForm,
        },
        {
          name: "View Status",
          path: "/view-leave-application",
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
  const handleDateChange = (date) => {
    setDates(prevDates => [...prevDates, moment(date).format("YYYY MM DD")]);
    setDatesCalender(prevDates => [...prevDates, date]);
};
const [applicationFormData , setApplicationFormData]=useState({
  reason:"",
  type:""

})
const handleApplicationSubmit = async ()=>{

  try {
    // let dates = JSON.stringify(dates)
    let response = await applyLeaveApplication({...applicationFormData, dates:JSON.stringify(dates), userId:globalState?.user?.id});
    if(response?.data?.message=="Leave request sent successfully"){
      toast.success(response?.data?.message);
      setApplicationForm(false)
    }
    else{
      toast.error("Something went wrong")
    }
  } catch (error) {
    toast.error("Internal Server Error")
  }
}
  return (
    <div className="d-flex">
      <Sidebar navItem={navItem} setNavItem={setNavItem}/>
      <div style={{ width: "80%" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<EmployeeDashboard />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/view-admin" element={<ViewAdmin />} />
          <Route path="/view-superviser" element={<ViewSuperviser />} />
          <Route path="/view-employee" element={<ViewEmployee />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/view-leave-application" element={<ViewLeaveApplicationList />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/view-task" element={<ViewTask />} />
        </Routes>
      </div>
      {applicationForm && (
      <>
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header d-flex justify-content-between">
                <h5 className="modal-title">Leave Application Form</h5>
                <button
                  type="button"
                  className="btn "
                  onClick={() => setApplicationForm(false)}
                >
                  <i className="fa fa-close"></i>
                </button>
              </div>

              <div className="modal-body row ">
                <div className="px-2">
                <label className="mt-0 mb-2">Type</label>
                <select className="form-control" onChange={(e)=>setApplicationFormData({...applicationFormData, type:e.target.value})}>
                  <option value="">Select</option>
                  <option value="Medical">Medical</option>
                  <option value="Casual">Casual</option>
                  <option value="Non Paid">Non Paid</option>
                </select>
                <label className="mt-2 mb-2">Reason</label>
                <input className="form-control" onChange={(e)=>setApplicationFormData({...applicationFormData, reason:e.target.value})}/>
                <label className="mt-2 mb-2">Select Date</label>
                <br/>
                <DatePicker
                selected={null}
                onChange={handleDateChange}
                selectsStart
                inline
                highlightDates={datesCalender}
            />
                <button className="mt-3 btn btn-primary w-100" onClick={()=>handleApplicationSubmit()}>Submit</button>
                </div>
                  </div>
                </div>
              </div>
            </div>
            {applicationForm && <div className="modal-backdrop fade show"></div>}
          </>
        )}
        <ToastContainer />
    </div>
  );
  
}

export default EmployeeLayout;
