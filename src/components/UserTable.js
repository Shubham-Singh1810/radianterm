import React, { useEffect, useState } from "react";
import { getEmployee, addEmpRating } from "../services/user.service";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function UserTable({ role }) {
  const navigate = useNavigate()
  const [userList, setUserList] = useState([]);
  const [userFilteredList, setUserFilteredList] = useState([]);
  const [showRatingPop, setShowRatingPop] = useState(false);
  const [ratingUser, setRatingUser] = useState();

  const getEmployeeListFunc = async () => {
    try {
      let response = await getEmployee({ role: role });
      setUserList(response.data.employees);
      setUserFilteredList(response.data.employees); // Initial set
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
  return (
    <div
      className="mt-3 mx-4 border rounded shadow-sm"
      style={{ overflow: "auto" }}
    >
      <div className="m-4 d-flex align-items-center border rounded p-2">
        <i className="fa fa-search text-secondary me-3"></i>{" "}
        <input
          onChange={(e) => handleUserFilter(e.target.value)}
          className="w-100"
          style={{ border: "none", outline: "none" }}
          placeholder="Search Employee"
        />
      </div>
      <table class="table table-striped ">
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
                  <div className="d-flex justify-content-end mx-1">
                    <i onClick={()=>navigate("/employee/"+v?.id)} className="fa fa-eye mx-1"></i>
                    <i className="fa fa-tasks mx-1"></i>
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
  );
}

export default UserTable;
