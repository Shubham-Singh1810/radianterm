import React from "react";
import CountUp from 'react-countup';
import ProjectReport from "../components/ProjectReport";
import AttendenceReport from "../components/AttendenceReport";
function Dashboard() {
  const statics = [
    {
      name: "Projects",
      count: "93",
      imgPath:"/images/project.png"
    },
    {
      name: "Attendance",
      count: "10",
      imgPath:"/images/attendance.png"
    },
    {
      name: "Teams",
      count: "205",
      imgPath:"/images/business-management.png"
    },
    {
      name: "Tasks",
      count: "12",
      imgPath:"/images/task.png"
    },
  ];
  return (
    <div className="">
      <div className="row mx-0 my-3 p-0 ">
        {statics?.map((v, i) => {
          return (
            <div className="col-3 m-0 p-0">
                <div className="p-4 m-3 rounded shadow">
                <p className="text-secondary"><b>{v?.name}</b></p>
                <div className="d-flex align-items-center" style={{fontWeight:"300"}}>
                    <img src={v?.imgPath} style={{height:"50px"}}/>
                    <h2 className="ms-2"><CountUp end={v?.count} /> {v?.name=="Attendance" && "/30"}</h2>
                </div>
                </div>
            </div>
          )
        })}
      </div>
      <div className="row mx-0 my-3 p-0">
        <div className="col-6">
        <ProjectReport/>
        </div>
        <div className="col-6">
        <AttendenceReport/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
