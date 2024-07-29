import React from "react";

function AttendenceReport() {
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
  const getColor = (hours) => {
    console.log(hours);
    return hours >= 8 ? "#000" : "#fff"; // Green if hours are 8 or more, otherwise red
  };
  return (
    <div className="border p-5">
      <div className="d-flex justify-content-end mb-3">
        <select className="">
          <option>Employee </option>
          <option>Shubham Singh</option>
          <option>Amit Jha</option>
          <option>Sahid Hasan</option>
          <option>Ritu </option>
        </select>
        <select className="ms-2">
          <option>Month</option>
          <option>January</option>
          <option>Feb</option>
          <option>March</option>
          <option>April</option>
          <option>May</option>
          <option>June</option>
          <option>July</option>
          <option>Auguest</option>
          <option>September</option>
          <option>October</option>
          <option>November</option>
          <option>December</option>
        </select>
      </div>
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
        {data?.map((v, i) => {
          return (
            <div
              style={{
                height: "300px",
                width: "17px",
                margin: "1.5px",
                borderRadius: "6px",
                // background: "whitesmoke",
              }}
              className={"d-flex align-items-end"}
            >
              <div
                style={{
                  height: v.hours * 30,
                  width: "100%",
                  background:v.sunday? "whitesmoke": v?.hours >= 8 ? "green" : "red",
                  borderRadius: "6px 6px 0px 0px",
                  textAlign:"center"
                  
                }}
              ><b>{v.sunday && "S U N D A Y"}</b></div>
            </div>
          );
        })}
      </div>
      <div className="d-flex w-100" style={{marginLeft:"38px"}}>
        {data?.map((v, i) => {
          return <p className="text-center" style={{margin:"1.5px", width:"17px"}}>{v?.date}</p>;
        })}
      </div>
      <h5 className="text-center mt-2 text-secondary">Shubham attendence report of July</h5>
    </div>
  );
}


export default AttendenceReport;