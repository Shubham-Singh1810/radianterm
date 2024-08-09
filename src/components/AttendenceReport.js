import React, { useEffect, useState } from "react";
import { markUserAttendence,employeeAttendenceReport, getMonthlyReportApi } from "../services/user.service";
import { useGlobalState } from "../GlobalProvider";
function AttendenceReport({role, userList}) {
  const { globalState } = useGlobalState();
  const data = [
    { date: "01", hours: 1 },
    { date: "02", hours: 8 },
    { date: "03", hours: 5 },
    { date: "04", hours: 6 },
    { date: "05", hours: 8 },
    { date: "06", hours: 9 },
    { date: "07", hours: 10, sunday:true },
    { date: "08", hours: 8 },
    { date: "09", hours: 10 },
    { date: "10", hours: 8 },
    { date: "11", hours: 8 },
    { date: "12", hours: 8 },
    { date: "13", hours: 8 },
    { date: "14", hours: 10, sunday:true },
    { date: "15", hours: 8 },
    { date: "16", hours: 8 },
    { date: "17", hours: 8 },
  ];
  const [date, setDate]=useState([])
  const getMonthlyAttendence = async ()=>{
    try {
        let response = await getMonthlyReportApi({month:"2024"+"-"+month, userId:userId})
        setDate(response?.data?.attendances)
    } catch (error) {
        
    }
  }
  const getEmployeeAttendence = async ()=>{
    try {
        let response = await employeeAttendenceReport({month:"2024"+"-"+month, userId:userId})
        setDate(response?.data?.attendances)
    } catch (error) {
        
    }
  }
  const [month, setMonth] = useState("08");
  const [userId, setUserId]=useState(globalState.user.id)
  useEffect(()=>{
    if(role=="1"){
      getEmployeeAttendence();
    }else{
      getMonthlyAttendence()

    }
  }, [month, userId])
  function convertToHours(time) {
    // Split the time string into hours, minutes, and optionally seconds
    if(!time){
      return 0
    }
    const parts = time.split(':').map(Number);
  
    // Initialize hours, minutes, and seconds based on the parts length
    const hours = parts.length > 0 ? parts[0] : 0;
    const minutes = parts.length > 1 ? parts[1] : 0;
    const seconds = parts.length > 2 ? parts[2] : 0;
  
    // Convert the time to hours
    const totalHours = hours + (minutes / 60) + (seconds / 3600);
  
    // Return the total hours
   
    return totalHours;
  }
  return (
    <div className="border p-md-5 p-3 mt-3 md-mt-0">
      
      <div className="d-flex justify-content-end mb-3">
      {role==1 && <select className="" onChange={(e)=>setUserId(e.target.value)}>
        <option>Employee </option>
        {userList?.map((v, i)=>{
          return(
            <option value={v?.id}>{v?.name}</option>
          )
        })}
          
        </select>}
        <select className="ms-2" onChange={(e)=>setMonth(e.target.value)}>
          <option value="">Month</option>
          <option value="01">January</option>
          <option value="02">Feb</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">Auguest</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>
      <div style={{ overflowX: "auto" }}>
      <div className=" d-flex">
        <div style={{ height: "300px", width: "35px", margin: "1.5px" }}>
          {[10, 8, 6, 4, 2].map((v, i) => {
            return (
              <p
                className="mb-0"
                style={{ height: "60px", position: "relative", bottom: "5px" }}
              >
                {v}hr
              </p>
            );
          })}
        </div>
        {date?.map((v, i) => {
          return (
            <div
              style={{
                height: "300px",
                width: "12.5px",
                margin: "1.5px",
                borderRadius: "6px",
                background: "whitesmoke",
              }}
              className={"d-flex align-items-end"}
            >
              <div
                style={{
                  height:  convertToHours(v?.total_hours)*30,
                  width: "12.5px",
                  background: convertToHours(v?.total_hours) >=8? "green":"red",
                  borderRadius: "6px 6px 0px 0px",
                  textAlign:"center"
                  
                }}
              >
                
                </div>
            </div>
          );
        })}
      </div>
      <div className="d-flex w-100" style={{marginLeft:"36px"}}>
        {date?.map((v, i) => {
          return <div className="text-center border" style={{margin:"1.5px", width:"12.5px",flexShrink: 0 , fontSize:"10px"}}>{v?.date.split("-")[2]}</div>;
        })}
      </div>
      {/* <h5 className="text-center mt-2 text-secondary">Shubham attendence report of July</h5> */}
      </div>
      
    </div>
  );
}


export default AttendenceReport;