import React, { useState, useEffect } from "react";
import { getListOfAllLeaveApplication, updateLeaveStatus } from "../services/user.service";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
function MarkLeaveApplication() {
  const [applicationList, setApplicationList] = useState([]);
  const handleLeaveApplication = async () => {
    try {
      let response = await getListOfAllLeaveApplication();
      setApplicationList(response?.data?.leaves);
    } catch (error) {}
  };
  useEffect(() => {
    handleLeaveApplication();
  }, []);

  const handleStatus = (status) => {
    if (status == 0) {
      return <span className="bg-warning text-light rounded px-1">"Applied"</span>;
    } else if (status == 1) {
      return <span className="bg-success text-light rounded px-1">"Approved"</span>;
    } else {
      return <span className="bg-danger text-light rounded px-1">"Rejected"</span>;
    }
  };
  const [showMarkPopup, setShowMarkPopup]=useState(false);
  const [editDataId, setEditData]=useState();
  const [formData, setFormData]=useState({
    comments:"",
    status:"",
  })
  const handleLeaveUpdate = async()=>{
    try {
        let response = await updateLeaveStatus({...formData, leaveId:editDataId});
        if(response?.data?.message=="Leave request updated successfully"){
            toast.success("Leave request updated successfully")
            handleLeaveApplication();
            setShowMarkPopup(false)
        }else{
            toast.error("Something went wrong")
        }
    } catch (error) {
       toast.error("Internal Server Error") 
    }
  }
  return (
    <div className="mt-3 mx-4 border rounded shadow-sm" style={{overflow:"auto"}}>
      <table class="table table-striped">
        <thead>
          <tr className="">
            <th scope="col">S.no</th>
            <th scope="col">Employee</th>
            <th scope="col">Type</th>
            <th scope="col">Dates</th>
            <th scope="col">Reason</th>
            <th scope="col">Staus</th>
            <th scope="col">Comment</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {applicationList?.map((v, i) => {
            return (
              <tr>
                <th scope="row" className="">
                  {i + 1}.
                </th>
                <th scope="row" className="">
                  <div className="d-flex align-items-center">
                    <div className="">
                      <img
                        src={"https://erm.onclicksolution.com/storage/app/public/" + v?.user?.photo}
                        style={{ height: "33px", width: "35px", borderRadius: "50%" }}
                      />
                    </div>
                    <div className="ms-2">
                      <p className="mb-0">{v?.user?.name}</p>
                      <p className="mb-0 text-secondary">{v?.user?.designation}</p>
                    </div>
                  </div>
                </th>
                <td className="pt-4">{v?.type}</td>
                <td className="pt-4">
                  {JSON.parse(v?.dates)?.map((v, i) => {
                    return <span className="border px-1 rounded me-2">{moment(v).format("DD-MM-YY")}</span>;
                  })}
                </td>
                <td className="pt-4">{v?.reason} </td>
                <td className="pt-4">{handleStatus(v?.status)} </td>
                <td className="pt-4">{v?.comments} </td>
                <td className="pt-4 text-center">
                  <i className="fa fa-edit" onClick={()=>{setEditData(v.id); setShowMarkPopup(true)}} ></i>{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showMarkPopup && (
      <>
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header d-flex justify-content-between">
                <h5 className="modal-title">Approve/Reject Leave</h5>
                <button
                  type="button"
                  className="btn "
                  onClick={() => setShowMarkPopup(false)}
                >
                  <i className="fa fa-close"></i>
                </button>
              </div>

              <div className="modal-body row ">
                <div className="px-2">
                    <label>Mark Status</label>
                     <select className="form-control mb-3" onChange={(e)=>setFormData({...formData, status:e.target.value})}>
                        <option value="1">Select Action</option>
                        <option value="1">Approve</option>
                        <option value="-1">Reject</option>
                     </select>
                     <label>Comment</label>
                     <textarea className="form-control" onChange={(e)=>setFormData({...formData, comments:e.target.value})}/>
                     <button className="btn btn-primary w-100 mt-3" onClick={handleLeaveUpdate}>Submit</button>
                </div>
                  </div>
                </div>
              </div>
            </div>
            {showMarkPopup && <div className="modal-backdrop fade show"></div>}
          </>
        )}
        <ToastContainer/>
    </div>
  );
}

export default MarkLeaveApplication;
