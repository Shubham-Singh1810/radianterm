import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import ProjectReport from "../components/ProjectReport";
import AttendenceReport from "../components/AttendenceReport";

import {
  getEmployee,
  sendNotification,
  sendMessage,
  getMessage,
  deleteMessage
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
  const [messageList, setMessageList] = useState([]);
  const handleGetMessage = async () => {
    try {
      let response = await getMessage();
      setMessageList(response?.data?.messages);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getEmployeeListFunc();
    handleGetMessage();
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
          handleGetMessage()
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
        if (response?.data?.message == "Message sent successfully!") {
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
  const [showMore, setShowMore]=useState(false)
  const handleDeleteMessage = async(id)=>{
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );
  
    if (!isConfirmed) return;
    try {
      let response = await deleteMessage(id)
      if(response.data.message=="Message deleted successfully!"){
        toast.success("Message deleted successfully!")
        handleGetMessage()
      }else{
        toast.error("Something went wrong")
      }
    } catch (error) {
      toast.error("Internal Server Error")
    }

  }
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
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h5 className="card-title ">Notifications</h5>
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
                      {showMore? messageList?.map((v, i) => {
                        return (
                          <a
                            href="#"
                            className="list-group-item list-group-item-action"
                          >
                            <div className="d-flex justify-content-end">
                            <i className="fa fa-close text-danger border rounded px-1" onClick={()=>handleDeleteMessage(v?.id)} style={{marginBottom:"-20px"}}></i>
                            </div>
                            
                            <div className="d-flex align-items-center">
                              <img
                                style={{
                                  height: "40px",
                                  width: "40px",
                                  borderRadius: "50%",
                                }}
                                src={
                                  "https://ermbackend.radiantengineering.co/storage/app/public/" +
                                  v?.user?.photo
                                }
                              />
                              <div className="ms-3">
                              <h6 className="mb-0">{v?.user?.name}</h6>
                              <p className="mb-0">{v?.user?.email}</p>
                              </div>
                              
                            </div>
                            <p className="mb-1 mt-3">{v?.message}</p>
                            <div className="d-flex w-100 justify-content-end">
                              <small className="">{v?.messageTime}</small>
                            </div>
                          </a>
                        );
                      }): messageList?.slice(0, 3)?.map((v, i) => {
                        return (
                          <a
                            href="#"
                            className="list-group-item list-group-item-action"
                          >
                            <div className="d-flex justify-content-end">
                            <i className="fa fa-close text-danger border rounded px-1" onClick={()=>handleDeleteMessage(v?.id)} style={{marginBottom:"-20px"}}></i>
                            </div>
                            <div className="d-flex align-items-center">
                              <img
                                style={{
                                  height: "40px",
                                  width: "40px",
                                  borderRadius: "50%",
                                }}
                                src={
                                  "https://ermbackend.radiantengineering.co/storage/app/public/" +
                                  v?.user?.photo
                                }
                              />
                              <div className="ms-3">
                              <h6 className="mb-0">{v?.user?.name}</h6>
                              <p className="mb-0">{v?.user?.email}</p>
                              </div>
                              
                            </div>
                            <p className="mb-1 mt-3">{v?.message}</p>
                            <div className="d-flex w-100 justify-content-end">
                              <small className="">{v?.messageTime}</small>
                            </div>
                          </a>
                        );
                      })}
                      <div className="d-flex justify-content-end mt-3">
                      <p className="text-primary" onClick={()=>setShowMore(!showMore)} style={{cursor:"pointer"}}><u>Show {!showMore ? "more" : "less"} </u></p>
                      </div>
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
