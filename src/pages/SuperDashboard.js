import React,{useEffect, useState} from "react";
import CountUp from 'react-countup';
import ProjectReport from "../components/ProjectReport";
import AttendenceReport from "../components/AttendenceReport";
import { getEmployee } from "../services/user.service";
function SuperDashboard() {
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
  const [userList, setUserList]=useState([])
  const getEmployeeListFunc = async () => {
    try {
      let response = await getEmployee();
      setUserList(response.data.employees);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getEmployeeListFunc();
  }, []);
  return (
    <div className="">
      <div className="row mx-0 my-3 p-0 ">
        {statics?.map((v, i) => {
          return (
            <div className="col-lg-3 col-md-6 col-12 m-0 p-0">
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
        <div className="col-md-6 col-12">
        <ProjectReport/>
        </div>
        <div className="col-md-6 col-12">
        <AttendenceReport role={1} userList={userList}/>
        </div>
      </div>
    </div>
  );
}

export default SuperDashboard;
