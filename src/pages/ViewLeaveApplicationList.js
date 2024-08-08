import React, { useState, useEffect } from "react";
import { getListOfLeaveApplication } from "../services/user.service";
import moment from "moment";
function ViewLeaveApplicationList() {
  const [applicationList, setApplicationList] = useState([]);
  const handleLeaveApplication = async () => {
    try {
      let response = await getListOfLeaveApplication();
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
  return (
    <>
      <div className="mt-3 mx-4 border rounded shadow-sm" style={{overflow:"auto"}}>
        <table class="table table-striped">
          <thead>
            <tr className="">
              <th scope="col">S.no</th>
              <th scope="col">Type</th>
              <th scope="col">Dates</th>
              <th scope="col">Reason</th>
              <th scope="col">Staus</th>
              <th scope="col">Comment</th>
            </tr>
          </thead>
          <tbody>
            {applicationList?.map((v, i) => {
              return (
                <tr>
                  <th scope="row" className="">
                    {i + 1}.
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ViewLeaveApplicationList;
