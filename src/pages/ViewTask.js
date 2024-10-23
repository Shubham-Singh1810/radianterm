import React, { useState, useEffect } from "react";
import { getTaskList, updateTask, editTask } from "../services/project.service";
import moment from "moment";
import { useGlobalState } from "../GlobalProvider";
import { getEmployee } from "../services/user.service";
import { getProjectList, addTaskApi } from "../services/project.service";

function ViewTask() {
  const { setGlobalState, globalState } = useGlobalState();
  const [taskListArr, setTaskListArr] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const getTaskListFunc = async () => {
    try {
      let response = await getTaskList();
      setTaskListArr(response?.data?.tasks);
      setFilteredTasks(response?.data?.tasks); // Initialize filtered tasks
    } catch (error) {}
  };

  useEffect(() => {
    getTaskListFunc();
  }, []);

  const handlePriorityReturn = (priority) => {
    if (priority === "Low") {
      return <span className="bg-success px-1 text-light rounded">Low</span>;
    } else if (priority === "Medium") {
      return <span className="bg-warning px-1  rounded">Medium</span>;
    } else if (priority === "High") {
      return <span className="bg-danger px-1 text-light rounded">High</span>;
    }
  };

  const handleStatusReturn = (status) => {
    console.log(status);
    if (status == 0) {
      return (
        <span className="bg-secondary text-light px-1 rounded">
          No Progress
        </span>
      );
    } else if (status == 1) {
      return (
        <span className="bg-primary text-light px-1 rounded">In Progress</span>
      );
    } else if (status == 2) {
      return (
        <span className=" bg-success text-light px-1 rounded">Completed</span>
      );
    }
  };

  const handleUpdateTask = async () => {
    try {
      let response = await updateTask(updateTaskId, { status: currentStatus });
      if (response?.data?.message === "Task status updated successfully") {
        setShowUpdatePop(false);
        getTaskListFunc();
      }
    } catch (error) {}
  };

  const handleEditTask = async () => {
    try {
      let response = await editTask(editForm.id, editForm);
      if (response?.data?.message === "Task updated successfully") {
        setShowEditPop(false);
        getTaskListFunc();
      }
    } catch (error) {}
  };

  const [showUpdatePop, setShowUpdatePop] = useState(false);
  const [updateTaskId, setUpdateTaskId] = useState();
  const [currentStatus, setShowCurrentStatus] = useState();
  const [showEditPop, setShowEditPop] = useState(false);
  const [editForm, setEditForm] = useState();

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

  const filterTasks = () => {
    let filtered = taskListArr;

    if (selectedEmployee) {
      filtered = filtered.filter((task) => task.empId === selectedEmployee);
    }

    if (selectedProject) {
      filtered = filtered.filter((task) => task.project_id === selectedProject);
    }

    if (selectedStatus !== "") {
      filtered = filtered.filter((task) => task.status == selectedStatus);
    }

    setFilteredTasks(filtered);
  };

  useEffect(() => {
    getEmployeeListFunc();
    getProjectListFunc();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [selectedEmployee, selectedProject, selectedStatus]);

  return (
    <>
      <div className="mt-3 mx-md-4 mx-2">
        <h3 className="ms-1">TASK LIST</h3>
        {true && (
          <div className="row mx-2 my-4">
            {(globalState?.user?.role !== "4" || globalState?.user?.isTL) && (
              <div className="col-6 p-0">
                <div className="">
                  <select
                    className="form-control"
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                  >
                    <option value="">Select Employee</option>
                    {userList?.map((v, i) => (
                      <option key={i} value={v?.id}>
                        {v?.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div className="col-3 p-0">
              <div className="mx-2">
                <select
                  className="form-control"
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                >
                  <option value="">Select Project</option>
                  {projectList?.map((v, i) => {
                    return (
                      <option key={i} value={v?.id}>
                        {v?.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="col-3 p-0">
              <div className="">
                <select
                  className="form-control"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="0">No Progress</option>
                  <option value="1">In Progress</option>
                  <option value="2">Completed</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="row">
          {filteredTasks?.map((v, i) => {
            return (
              <div className="col-md-6 col-12" key={i}>
                <div className="m-2 shadow-sm border rounded p-3">
                  <p>
                    <span>Project</span> : <span>{v?.project?.name}</span>
                  </p>
                  <p>
                    <span>Assigned By</span> : {v?.assigned_by_user?.name}
                  </p>
                  <p>
                    <span>Assigned To</span> : {v?.employee?.name}
                  </p>
                  <p>
                    <span>Priority</span> : {handlePriorityReturn(v?.priority)}
                  </p>
                  <p>
                    <p>
                      <span>Deadline</span> :{" "}
                      <span className="text-danger">{v?.deadline}</span>
                    </p>
                    <span>Status</span> : {handleStatusReturn(v?.status)}
                  </p>
                  <p>
                    <span>Task Description : </span>
                    {v?.taskDescription}
                  </p>

                  {globalState?.user?.id == v?.empId && (
                    <button
                      className="btn btn-primary btn-sm  me-2 "
                      onClick={() => {
                        setShowUpdatePop(true);
                        setUpdateTaskId(v?.id);
                      }}
                    >
                      Update Status
                    </button>
                  )}
                  {globalState?.user?.role != "1" &&
                    globalState?.user?.id == v?.assignedBy && (
                      <button
                        className="btn btn-primary btn-sm  me-2 "
                        onClick={() => {
                          setShowEditPop(true);
                          setEditForm(v);
                        }}
                      >
                        Edit
                      </button>
                    )}
                  {globalState?.user?.role == "1" && (
                    <button
                      className="btn btn-primary btn-sm  me-2 "
                      onClick={() => {
                        setShowEditPop(true);
                        setEditForm(v);
                      }}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {showUpdatePop && (
        <>
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header d-flex justify-content-between">
                  <h5 className="modal-title">Update Status</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowUpdatePop(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <select
                    className="form-control"
                    onChange={(e) => setShowCurrentStatus(e.target.value)}
                  >
                    <option>Select Status</option>
                    <option value={0}>No Progress</option>
                    <option value={1}>In Progress</option>
                    <option value={2}>Completed</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleUpdateTask}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show"></div>
        </>
      )}
      {showEditPop && (
        <>
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header d-flex justify-content-between">
                  <h5 className="modal-title">Edit Task</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowEditPop(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div>
                    <label>Task Description</label>
                    <input
                      type="text"
                      value={editForm?.taskDescription}
                      className="form-control"
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          taskDescription: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleEditTask}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show"></div>
        </>
      )}
    </>
  );
}

export default ViewTask;
