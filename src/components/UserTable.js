import React, { useEffect, useState } from "react";
import { getEmployee } from "../services/user.service";
function UserTable({role}) {
  const [userList, setUserList]=useState([])
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
                      <img src={"https://erm.onclicksolution.com/storage/app/public/"+ v?.photo} />
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
                    <i className="fa fa-eye "></i>
                    <i className="fa fa-edit mx-2"></i>
                    <i className="fa fa-trash "></i>
                    {/* {v?.isAdmin=="0" && <i className="fa fa-trash" onClick={()=>handleDelete(v?.id)}></i>} */}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
