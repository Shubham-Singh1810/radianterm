import React, { useEffect, useState } from "react";
import { getEmployee, addEmpRating } from "../services/user.service";
import { ToastContainer, toast } from "react-toastify";
function UserTable({ role }) {
  const [userList, setUserList] = useState([]);
  const [showRatingPop, setShowRatingPop] = useState(false);
  const [ratingUser, setRatingUser] = useState();
  const getEmployeeListFunc = async () => {
    try {
      let response = await getEmployee({ role: role });
      setUserList(response.data.employees);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getEmployeeListFunc();
  }, [role]);
  const [formData, setFormData] = useState({
    month: "",
    rating: "",
    comments: "",
  });
  const handleAddRating = async () => {
    try {
      let response = await addEmpRating({...formData, userId:ratingUser.id});
      if(response?.data.message=='Rating submitted successfully'){
        toast.success('Rating submitted successfully');
        setShowRatingPop(false)
      }
    } catch (error) {}
  };
  return (
    <div className="mt-3 mx-4 border rounded shadow-sm">
      <table class="table table-striped">
        <thead>
          <tr className="">
            <th scope="col">S.no</th>
            <th scope="col">Profile</th>
            <th scope="col">Contact No.</th>
            <th scope="col">Designation</th>
            <th scope="col">
              <div className="d-flex justify-content-end">
                <div>Action</div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {userList?.map((v, i) => {
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
                          "https://erm.onclicksolution.com/storage/app/public/" +
                          v?.photo
                        }
                      />
                    </div>
                    <div className="ms-2 my-auto">
                      <h6 className="mb-0">{v?.name}</h6>
                      <p className="text-secondary mb-0 fontMono">{v?.email}</p>
                    </div>
                  </div>
                </td>
                <td className="pt-4">{v?.contact}</td>
                <td className="pt-4">{v?.designation} </td>
                <td className="pt-4">
                  <div className="d-flex justify-content-end">
                    {/* <i className="fa fa-eye "></i> */}
                    {/* <i className="fa fa-edit mx-2"></i> */}
                    <i
                      className="fa fa-star mx-2"
                      onClick={() => {
                        setShowRatingPop(true);
                        setRatingUser(v);
                      }}
                    ></i>
                  </div>
                </td>
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
                    
                    <label>Rate Employee</label>
                    <input className="form-control mt-1 mb-2" onChange={(e)=>setFormData({...formData, rating:e.target.value})}/>
                    <label>Select Month</label>
                    <select className=" form-control mt-1 mb-2" onChange={(e)=>setFormData({...formData, month:e.target.value})}>
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
                    <textarea className="form-control mt-1 mb-2" onChange={(e)=>setFormData({...formData, comments:e.target.value})}/>
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
      <ToastContainer/>
    </div>
  );
}

export default UserTable;
