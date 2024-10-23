import React, { useEffect, useState } from "react";
import { getEmployee, addEmpRating, addTeamLeader, getTeamLeaders } from "../services/user.service";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getProjectList } from "../services/project.service";
function ViewSuperviser() {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [userFilteredList, setUserFilteredList] = useState([]);
  const [showRatingPop, setShowRatingPop] = useState(false);
  const [ratingUser, setRatingUser] = useState();
  const [showPopUpForm, setShowPopUpForm] = useState(false);
  const getTeamLeaderListFunc = async () => {
    try {
      let response = await getTeamLeaders();
      console.log(response.data.teamLeaders[0].user.name)
      setUserList(response.data.teamLeaders);
      setUserFilteredList(response.data.teamLeaders); // Initial set
    } catch (error) {
      console.log(error);
    }
  };
  const getEmployeeListFunc = async () => {
    try {
      let response = await getEmployee({role: 4});
      
      setEmployeeList(response?.data?.employees);
      
    } catch (error) {
      console.log(error);
    }
  };
  const [projectList, setProjectList] = useState([]);
  const getProjectListFunc = async () => {
    try {
      let response = await getProjectList(1);
      setProjectList(response.data.projects);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTeamLeaderListFunc();
    getProjectListFunc();
    getEmployeeListFunc()
  }, []);

  const [formData, setFormData] = useState({
    month: "",
    rating: "",
    comments: "",
  });

  const handleAddRating = async () => {
    try {
      let response = await addEmpRating({ ...formData, userId: ratingUser.id });
      if (response?.data.message === "Rating submitted successfully") {
        toast.success("Rating submitted successfully");
        setShowRatingPop(false);
      } else if (
        response?.data.message === "This employee is not in your team"
      ) {
        toast.warning("This employee is not in your team");
        setShowRatingPop(false);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };

  const handleUserFilter = (searchKey) => {
    if (searchKey.length > 0) {
      const newArr = userList.filter((v) =>
        v.name.toLowerCase().includes(searchKey.toLowerCase())
      );
      setUserFilteredList(newArr);
    } else {
      setUserFilteredList(userList);
    }
  };
  const [teamLeaderFormData, setTeamLeaderFormData]=useState({
    user_id:"",
    project_id:""
  })
  const handleTeamLeaderAssignFunc =async ()=>{
    try {
      let response = await addTeamLeader(teamLeaderFormData)
      if(response?.data.message=="Team leader assigned successfully"){
        toast.success("Team leader assigned successfully");
        setShowPopUpForm(false);
        getTeamLeaderListFunc();
      }else if(response?.data.message=="This team leader is already assigned to the project"){
        toast.info("This team leader is already assigned to the project");
        setShowPopUpForm(false)
      }
      else{
        toast.success("Something went wrong");
      }
    } catch (error) {
      toast.error("Internal Server Error");
    }
  }
  return (
    <>
      <div
        className="mt-3 mx-4 border rounded shadow-sm"
        style={{ overflow: "auto" }}
      >
        <div className="d-flex align-items-center  m-4 ">
          <div className="d-flex align-items-center w-50 border rounded p-2">
            <i className="fa fa-search text-secondary me-3"></i>{" "}
            <input
              onChange={(e) => handleUserFilter(e.target.value)}
              className=""
              style={{ border: "none", outline: "none" }}
              placeholder="Search Team Leader"
            />
          </div>
          <button
            onClick={() => setShowPopUpForm(true)}
            className="btn btn-primary w-20 ms-3"
          >
            Assign Team Leader <i className="ms-2 fa fa-plus"></i>
          </button>
        </div>

        <table class="table table-striped ">
          <thead>
            <tr className="">
              <th scope="col">S.no</th>
              <th scope="col">Profile</th>
              <th scope="col">Project</th>
              <th scope="col">Contact No.</th>
              <th scope="col">Designation</th>
              
            </tr>
          </thead>
          <tbody>
            {userFilteredList?.map((v, i) => {
              return (
                <tr>
                  <th scope="row" className="pt-4">
                    {i + 1}.
                  </th>
                  <td>
                    <div className="d-flex">
                      <div className="provileAvtar">
                        <img
                          src={
                            "https://ermbackend.radiantengineering.co/storage/app/public/" +
                            v?.user?.photo
                          }
                        />
                      </div>
                      <div className="ms-2 my-auto">
                        <h6 className="mb-0">{v?.user?.name}</h6>
                        <p className="text-secondary mb-0 fontMono">
                          {v?.user?.email}
                        </p>
                      </div>
                    </div>
                  </td>
                   <td className="pt-4">{v?.project?.name}</td>
                  <td className="pt-4">{v?.user?.contact}</td>
                  <td className="pt-4">{v?.user?.designation} </td>
                  
                </tr>
              );
            })}
          </tbody>
        </table>
        {showRatingPop && (
          <>
            <div className="modal show d-block" tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header d-flex justify-content-between">
                    <h5 className="modal-title">
                      Rate {ratingUser?.name} Perfomance
                    </h5>
                    <button
                      type="button"
                      className="btn "
                      onClick={() => setShowRatingPop(false)}
                    >
                      <i className="fa fa-close"></i>
                    </button>
                  </div>

                  <div className="modal-body row ">
                    <div className="px-2">
                      <label>Rate Employee (1.0 to 5.0)</label>
                      <input
                        className="form-control mt-1 mb-2"
                        onChange={(e) =>
                          setFormData({ ...formData, rating: e.target.value })
                        }
                      />
                      <label>Select Month</label>
                      <select
                        className=" form-control mt-1 mb-2"
                        onChange={(e) =>
                          setFormData({ ...formData, month: e.target.value })
                        }
                      >
                        <option value="">Month</option>
                        <option value="2024-01">January</option>
                        <option value="2024-02">Feb</option>
                        <option value="2024-03">March</option>
                        <option value="2024-04">April</option>
                        <option value="2024-05">May</option>
                        <option value="2024-06">June</option>
                        <option value="2024-07">July</option>
                        <option value="2024-08">Auguest</option>
                        <option value="2024-09">September</option>
                        <option value="2024-10">October</option>
                        <option value="2024-11">November</option>
                        <option value="2024-12">December</option>
                      </select>
                      <label>Comment</label>
                      <textarea
                        className="form-control mt-1 mb-2"
                        onChange={(e) =>
                          setFormData({ ...formData, comments: e.target.value })
                        }
                      />
                      <button
                        className="btn btn-primary w-100 mt-3"
                        onClick={handleAddRating}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {showRatingPop && <div className="modal-backdrop fade show"></div>}
          </>
        )}
        <ToastContainer />
      </div>

      {showPopUpForm && (
        <>
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header d-flex justify-content-between">
                  <h5 className="modal-title">
                    Assign Team Leader To A Project
                  </h5>
                  <button
                    type="button"
                    className="btn "
                    onClick={() => setShowPopUpForm(false)}
                  >
                    <i className="fa fa-close"></i>
                  </button>
                </div>

                <div className="modal-body row ">
                  <div className="px-2">
                    <label className="mt-0 mb-2">Employee</label>
                    <select className="form-control" onChange={(e)=>setTeamLeaderFormData({...teamLeaderFormData, user_id:e.target.value})}>
                      <option value="">Select</option>
                      {employeeList?.map((v, i) => {
                        return <option value={v?.id}>{v?.name}</option>;
                      })}
                    </select>
                    <label className="mt-0 mb-2 mt-3">Project</label>
                    <select className="form-control" onChange={(e)=>setTeamLeaderFormData({...teamLeaderFormData, project_id:e.target.value})}>
                      <option value="">Select</option>
                      {projectList?.map((v, i) => {
                        return <option value={v?.id}>{v?.name}</option>;
                      })}
                    </select>

                    <br />

                    <button className={((teamLeaderFormData.project_id && teamLeaderFormData.user_id) ? "" : " disabled" ) + " mt-3 btn btn-primary w-100"} onClick={handleTeamLeaderAssignFunc}>
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showPopUpForm && <div className="modal-backdrop fade show"></div>}
        </>
      )}
    </>
  );
}

export default ViewSuperviser;
