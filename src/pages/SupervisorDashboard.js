import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import ProjectReport from "../components/ProjectReport";
import AttendenceReport from "../components/AttendenceReport";
import moment from "moment";
import { useGlobalState } from "../GlobalProvider";
import { markUserAttendence, getMonthlyReportApi, getStatics } from "../services/user.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function SupervisorDashboard() {
  const { globalState } = useGlobalState();
  const [staticsData, setStaticsData]=useState()
  const statics = [
    {
      name: "Projects",
      count: staticsData?.projects,
      imgPath: "/images/project.png",
    },
    {
      name: "Attendance",
      count: staticsData?.attendance,
      imgPath: "/images/attendance.png",
    },
    {
      name: "Performance",
      count: staticsData?.performance,
      imgPath: "/images/business-management.png",
    },
    {
      name: "Tasks",
      count: staticsData?.tasks,
      imgPath: "/images/task.png",
    },
  ];
  
  const [currentTime, setCurrentTime] = useState(moment().format("DD MMM YYYY HH:mm:ss"));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment().format("DD MMM YYYY HH:mm:ss"));
    }, 1000);

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  const getStaticsReport =  async ()=>{
    try {
        let response = await getStatics();
        console.log(response?.data)
        setStaticsData(response?.data)
    } catch (error) {
        
    }
  }
useEffect(()=>{
    getStaticsReport()
}, [])
  
 
  const [status, setStatus] = useState();
  const handleInTime = async () => {
    let formData = {
      userId: globalState.user.id,
      in_time: moment().format("HH:mm"),
      date: moment().format("YYYY-MM-DD"),
      status: status,
    };
    try {
      let response = await markUserAttendence(formData);
      if (response.data.message == "In time recorded successfully") {
        toast.success(response?.data?.message);
       
      } else {
        toast.success(response?.data?.message);
      }
      getStaticsReport()
    } catch (error) {}
  };
  const handleCheckboxChange = (newStatus) => {
    setStatus(newStatus);
  };
  const handleOutTime = async () => {
    let formData = {
      userId: globalState.user.id,
      out_time: moment().format("HH:mm"),
      date: moment().format("YYYY-MM-DD"),
      // status: status,
    };
    try {
      let response = await markUserAttendence(formData);
      if (response.data.message == "In time recorded successfully") {
        toast.success(response?.data?.message);
      } else {
        toast.success(response?.data?.message);
      }
      getStaticsReport()
    } catch (error) {}
  };
  const [checkOut, setCheckOut] = useState(false);
  return (
    <div className="">
      <div className="row mx-0 my-3 p-0 ">
        {statics?.map((v, i) => {
          return (
            <div className="col-lg-3 col-md-6 col-12 m-0 p-0">
              <div className="p-4 m-3 rounded shadow">
                <p className="text-secondary">
                  <b>{v?.name}</b>
                </p>
                <div className="d-flex align-items-center" style={{ fontWeight: "300" }}>
                  <img src={v?.imgPath} style={{ height: "50px" }} />
                  <h2 className="ms-2">
                    {v?.name=="Attendance" ? v?.count : <CountUp end={v?.count} />}
                     {/* {v?.name == "Attendance" && "/30"} */}
                  </h2>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="row mx-0 my-3 p-0">
        {!staticsData?.attendanceInReport ? (
          <div className="col-md-6 col-12">
            <div className="border p-3 rounded shadow-sm text-light" style={{ background: "orangered" }}>
              <p>Mark Today's Attendence</p>
              <h5 className="mb-3">{currentTime}</h5>
              <div className="d-flex justify-content-between bg-light text-dark p-2 rounded">
                <div>
                  <input
                    type="checkbox"
                    checked={status === "Present"}
                    onChange={() => handleCheckboxChange("Present")}
                  />
                  <span className="ms-2">Present</span>
                </div>
                <div>
                  <input
                    type="checkbox"
                    checked={status === "Absent"}
                    onChange={() => handleCheckboxChange("Absent")}
                  />
                  <span className="ms-2">Absent</span>
                </div>
                <div>
                  <input
                    type="checkbox"
                    checked={status === "Holiday"}
                    onChange={() => handleCheckboxChange("Holiday")}
                  />
                  <span className="ms-2">Holiday</span>
                </div>
              </div>
              <button className={"btn btn-success w-100 mt-3 " + (!status && " disabled")} onClick={handleInTime}>
                Submit
              </button>
            </div>
          </div>
        ) : (
          <div className="col-md-6 col-12">
            <div className="border p-3 rounded shadow-sm bg-success text-light" style={{ background: "green" }}>
              <p>Mark Out Time</p>
              {!staticsData?.out_time ? <h5 className="mb-3">You have started your day at {staticsData.in_time}</h5>: <h5 className="mb-3"> You have closed your day at {staticsData?.out_time}</h5>}
              
              <div className="d-flex justify-content-between p-2 rounded">
                <div>
                  <input type="checkbox" checked={checkOut} onChange={() => setCheckOut(!checkOut)} />
                  <span className="ms-2">Are you closing your day</span>
                </div>
              </div>
              <button
                className={"btn btn-warning w-100 mt-3" + (!checkOut ? " disabled" : "")}
                onClick={handleOutTime}
                disabled={!checkOut} // This disables the button when checkOut is false
              >
                Submit
              </button>
            </div>
          </div>
        )}

        <div className="col-md-6 col-12">
          <AttendenceReport role={4}/>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SupervisorDashboard;
