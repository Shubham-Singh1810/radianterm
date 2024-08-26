import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import ProjectReport from "../components/ProjectReport";
import AttendenceReport from "../components/AttendenceReport";
import {
  getEmployee,
  sendNotification,
  sendMessage,
} from "../services/user.service";
import { ToastContainer, toast } from "react-toastify";
function SuperDashboard() {
  const statics = [
    {
      name: "Projects",
      count: "93",
      imgPath: "/images/project.png",
    },
    {
      name: "Attendance",
      count: "10/31",
      imgPath: "/images/attendance.png",
    },
    {
      name: "Teams",
      count: "205",
      imgPath: "/images/business-management.png",
    },
    {
      name: "Tasks",
      count: "12",
      imgPath: "/images/task.png",
    },
  ];
  const [userList, setUserList] = useState([]);
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
  const [showNotificationForm, setShowNotificationForm] = useState(false);
  const [notificationForm, setNotificationForm] = useState({
    message: "",
    id: "",
  });
  const sendNotificationFunc = async () => {
    if (notificationForm?.id == "") {
      try {
        let response = await sendNotification(notificationForm);
        if (
          response?.data?.message == "Message sent to all users successfully!"
        ) {
          toast.success("Message sent to all users successfully!");
          setShowNotificationForm(false);
        } else {
          toast.success("Something went wrong");
        }
      } catch (error) {
        toast.success("Internal Server Error");
      }
    } else {
      try {
        let response = await sendMessage(notificationForm);
        if (
          response?.data?.message == "Message sent successfully!"
        ) {
          toast.success("Message sent successfully!");
          setShowNotificationForm(false);
        } else {
          toast.success("Something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
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
                <div
                  className="d-flex align-items-center"
                  style={{ fontWeight: "300" }}
                >
                  <img src={v?.imgPath} style={{ height: "50px" }} />
                  <h2 className="ms-2"> {v?.count}</h2>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="row mx-0 my-3 p-0">
        <div className="col-md-6 col-12">
          {/* <ProjectReport/> */}
          <div className="border p-3">
            <div>
              <div className="card shadow-sm ">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h5 className="card-title">Notifications</h5>
                        <div className="d-flex my-2 mt-3">
                          <h6
                            style={{ cursor: "pointer" }}
                            className={"badge me-2 bg-primary"}
                          >
                            All
                          </h6>
                          <h6
                            style={{ cursor: "pointer" }}
                            className={"badge me-2 bg-secondary"}
                          >
                            Latest
                          </h6>
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() =>
                        setShowNotificationForm(!showNotificationForm)
                      }
                    >
                      {" "}
                      {showNotificationForm
                        ? "Show Notification"
                        : "Send Notification"}
                    </button>
                  </div>
                  {showNotificationForm ? (
                    <div>
                      <select
                        className="form-control"
                        onChange={(e) =>
                          setNotificationForm({
                            ...notificationForm,
                            id: e.target.value,
                          })
                        }
                      >
                        <option>Select Employee</option>
                        <option value="">All</option>
                        {userList?.map((v, i) => {
                          return <option value={v?.id}>{v?.name}</option>;
                        })}
                      </select>
                      <textarea
                        className="form-control my-3"
                        placeholder="Message"
                        onChange={(e) =>
                          setNotificationForm({
                            ...notificationForm,
                            message: e.target.value,
                          })
                        }
                      />
                      <button
                        className="btn btn-primary w-100"
                        onClick={sendNotificationFunc}
                      >
                        Send
                      </button>
                    </div>
                  ) : (
                    <div className="list-group">
                      <a
                        href="#"
                        className="list-group-item list-group-item-action"
                      >
                        <h6 className="mb-1">Notice</h6>

                        <p className="mb-1">
                          Aaj sabka off hai aur sabko ghumne jane k liye extra
                          paisa bhi milega
                        </p>
                        <div className="d-flex w-100 justify-content-end">
                          <small className="">2 min ago</small>
                        </div>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <AttendenceReport role={1} userList={userList} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SuperDashboard;
