import React, { useState, useEffect } from "react";
import { useGlobalState } from "../GlobalProvider";
import { getEmployee } from "../services/user.service";
import { getProjectList, addTaskApi } from "../services/project.service";
import { useNavigate } from "react-router-dom";
import AttendenceReport from "../components/AttendenceReport";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
function EmployeeReport() {
  const { setGlobalState, globalState } = useGlobalState();
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const getRoles = () => {
    if (globalState?.user?.role === "1") {
      return "";
    }
    if (globalState?.user?.role === "2") {
      return "3";
    }
    if (globalState?.user?.role === "3") {
      return "4";
    }
    if (globalState?.user?.role === "4") {
      return "4";
    }
  };

  const getEmployeeListFunc = async () => {
    try {
      let response = await getEmployee({
        role: getRoles(),
      });
      setUserList(response.data.employees);
    } catch (error) {
      console.log(error);
    }
  };
  const getProjectListFunc = async () => {
    try {
      let response = await getProjectList();
      setProjectList(response.data.projects);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getEmployeeListFunc();
    getProjectListFunc();
  }, []);
  const handleDownload = () => {
    const input = document.getElementById("report");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("employee-report.pdf");
    });
  };
  return (
    <div className="mt-3 mx-md-4 mx-2">
      <h3 className="ms-2">View Employee Report</h3>
      <div className="row m-0 my-4 p-0">
        <div className="col-5">
          <select className="form-control">
            <option>Select Employee</option>
            {userList?.map((v, i) => {
              return <option value={v?.id}>{v?.name}</option>;
            })}
          </select>
        </div>
        <div className="col-5">
          <select className="form-control">
            <option>Select Month</option>
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
        <div className="col-2">
          <select className="form-control">
            <option>Select Year</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
          </select>
        </div>
      </div>
      {/* download area start */}
      
      <div className="row mx-2 rounded shadow-sm p-3 border" id="report">
        <div className="col-12 p-0 m-0">
          <div className="d-flex justify-content-between px-2">
            <img
              src={
                "https://ermbackend.radiantengineering.co/storage/app/public/" +
                globalState?.user?.photo
              }
              className="img-fluid"
              style={{ height: "150px", width: "150px", borderRadius: "50%" }}
            />
            <div className="my-auto" style={{ textAlign: "right" }}>
              <h4 className="mb-1 mt-3">{globalState?.user?.name}</h4>
              <h6 className="text-secondary">
                {globalState?.user?.designation}
              </h6>
              <h6 className="text-secondary">{globalState?.user?.contact}</h6>
              <h6 className="text-secondary">{globalState?.user?.email}</h6>
            </div>
          </div>
          <hr />
        </div>
        <div className="col-12 row p-0 m-0">
          <div className="col-6">
            <h3>Attendence Report</h3>
            <p>
              Attendance : <b>20</b>
            </p>
            <p>
              Leave : <b>00</b>
            </p>
            <p>
              Late Entry : <b>03</b>
            </p>
            <p>
              Extra Hours : <b>12 hr 34 min</b>
            </p>
           
            

            <p>
              Performance Ratting :{" "}
              <b>
                <i className="fa fa-star text-warning"></i>
                <i className="fa fa-star text-warning"></i>
                <i className="fa fa-star text-warning"></i>
                <i className="fa fa-star-o text-secondary"></i>
                <i className="fa fa-star-o text-secondary"></i>
              </b>
            </p>
          </div>
          <div className="col-6">
          <h3>Task Report</h3>
            <p>
              Assigned Task : <b>20</b>
            </p>
            <p>
              Completed Task : <b>12</b>
            </p>
            <p>
              In Progress Task : <b>5</b>
            </p>
            <p>
              No Progress Task : <b>3</b>
            </p>
            <p>
              Failed Deadline Task : <b>2</b>
            </p>
            
          </div>
        </div>
      </div>

      {/* download area end */}
      <button className="btn btn-primary mt-3 ms-2" onClick={()=>handleDownload()}>Download Pdf</button>
    </div>
  );
}

export default EmployeeReport;
