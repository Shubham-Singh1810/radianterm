import React, { useState, useEffect } from "react";
import { getTaskList, updateTask, editTask } from "../services/project.service";
import moment from "moment";
import { useGlobalState } from "../GlobalProvider";
function ViewTask() {
  const { setGlobalState, globalState } = useGlobalState();
  const [taskListArr, setTaskListArr] = useState([]);
  const getTaskListFunc = async () => {
    try {
      let response = await getTaskList();
      setTaskListArr(response?.data?.tasks);
    } catch (error) {}
  };
  useEffect(() => {
    getTaskListFunc();
  }, []);

  const handlePriorityReturn = (priority) => {
    if (priority == "Low") {
      return <span className="bg-success px-1 text-light rounded">Low</span>;
    } else if (priority == "Medium") {
      return <span className="bg-warning px-1  rounded">Medium</span>;
    } else if (priority == "High") {
      return <span className="bg-danger px-1 text-light rounded">High</span>;
    }
  };
  const handleStatusReturn = (status) => {
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
  const [showUpdatePop, setShowUpdatePop] = useState(false);
  const [updateTaskId, setUpdateTaskId] = useState();
  const [currentStatus, setShowCurrentStatus] = useState();
  const handleUpdateTask = async () => {
    try {
      let response = await updateTask(updateTaskId, { status: currentStatus });
      if (response?.data?.message == "Task status updated successfully") {
        setShowUpdatePop(false);
        getTaskListFunc();
      }
    } catch (error) {}
  };

  //   edit task

  const [showEditPop, setShowEditPop] = useState(false);
  const [editForm, setEditForm] = useState();
  const handleEditTask = async () => {
    try {
      let response = await editTask(editForm.id, editForm);
      if (response?.data?.message == "Task updated successfully") {
        setShowEditPop(false);
        getTaskListFunc();
      }
    } catch (error) {}
  };
  return (
    <>
      <div className="mt-3 mx-4">
        <div className="row">
          {taskListArr?.map((v, i) => {
            return (
              <div className="col-6">
                <div className="m-2 shadow-sm border rounded p-3">
                  <p>
                    <span>Project</span> : <span>{v?.project?.name}</span>
                  </p>
                  <p>
                    <span>Assigned By</span> : {v?.assigned_by_user?.name}
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
                    className="btn "
                    onClick={() => setShowUpdatePop(false)}
                  >
                    <i className="fa fa-close"></i>
                  </button>
                </div>

                <div className="modal-body row ">
                  <div>
                    <select
                      className="form-control"
                      onChange={(e) => setShowCurrentStatus(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="0">No Progress</option>
                      <option value="1">In Progress</option>
                      <option value="2">Completed</option>
                    </select>
                    <button
                      className="btn btn-primary w-100  mt-4"
                      onClick={handleUpdateTask}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showUpdatePop && <div className="modal-backdrop fade show"></div>}
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
                    className="btn "
                    onClick={() => setShowEditPop(false)}
                  >
                    <i className="fa fa-close"></i>
                  </button>
                </div>

                <div className="modal-body row ">
                  <div>
                    <label className="mb-1 ">Select Priority</label>
                    <select
                      className="form-control"
                      onChange={(e) =>
                        setEditForm({ ...editForm, priority: e.target.value })
                      }
                    >
                      <option value="" label="Select priority" />
                      <option value="Low" label="Low" />
                      <option value="Medium" label="Medium" />
                      <option value="High" label="High" />
                    </select>
                    <label className="mb-1 mt-3">Task Description</label>
                    <textarea
                      className="form-control"
                      value={editForm.taskDescription}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          taskDescription: e.target.value,
                        })
                      }
                    />
                    <label className="mb-1 mt-3">Deadline</label>
                    <input
                      className="form-control"
                      type="date"
                      onChange={(e) =>
                        setEditForm({ ...editForm, deadline: e.target.value })
                      }
                    />
                    <label className="mb-1 mt-3">Select Status</label>
                    <select
                      className="form-control"
                      onChange={(e) =>
                        setEditForm({ ...editForm, status: e.target.value })
                      }
                    >
                      <option value="">Select</option>
                      <option value="0">No Progress</option>
                      <option value="1">In Progress</option>
                      <option value="2">Completed</option>
                    </select>
                    <button
                      className="btn btn-primary w-100  mt-4"
                      onClick={handleEditTask}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showEditPop && <div className="modal-backdrop fade show"></div>}
        </>
      )}
    </>
  );
}

export default ViewTask;
