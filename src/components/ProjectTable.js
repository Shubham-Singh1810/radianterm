import React, { useEffect, useState } from "react";
import { getProjectList } from "../services/project.service";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../GlobalProvider";
function ProjectTable({ status }) {
  const { setGlobalState, globalState } = useGlobalState();
  const navigate = useNavigate();
  const [projectList, setProjectList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const getProjectListFunc = async () => {
    try {
      let response = await getProjectList(status);
      setProjectList(response.data.projects);
      setFilteredList(response.data.projects);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProjectListFunc();
  }, [status]);
  const handleSearch = (key) => {
    if (key.length > 0) {
      let newArr = projectList?.filter((v, i) => {
        return v?.name?.toLowerCase().includes(key.toLowerCase());
      });
      setFilteredList(newArr);
    } else {
      setFilteredList(projectList);
    }
  };
  return (
    <div
      className="mt-3 mx-4 border rounded shadow-sm"
      style={{ overflow: "auto" }}
    >
      <div className="row">
        <div className="col-5">
          <input
            className="form-control my-4 ms-3"
            placeholder="Search Project"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <table class="table table-striped">
        <thead>
          <tr className="">
            <th scope="col">S.no</th>
            <th scope="col">Project Name</th>
            <th scope="col">Client</th>
            <th scope="col">Location</th>
            <th scope="col">Nature</th>
            <th scope="col">Discription</th>
            {/* <th scope="col">Cost</th> */}
            <th scope="col">Area</th>
            <th scope="col">
              <div className="d-flex justify-content-end">
                <div>Action</div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredList?.map((v, i) => {
            return (
              <tr>
                <th scope="row" className="pt-4">
                  {i + 1}.
                </th>
                <td>
                  <div className="d-flex pt-4">
                    <div className="ms-2 my-auto">
                      <h6 className="mb-0">{v?.name}</h6>
                    </div>
                  </div>
                </td>
                <td className="pt-4">{v?.client}</td>
                <td className="pt-4">{v?.location} </td>
                <td className="pt-4">{v?.projectNature} </td>
                <td className="pt-4">{v?.projectDescription} </td>
                {/* <td className="pt-4">{v?.projectCost} </td> */}
                <td className="pt-4">{v?.developmentArea} </td>
                <td className="pt-4">
                  <div className="d-flex justify-content-end align-items-center">
                    {v?.projectScope && (
                      <a
                        href={
                          "https://ermbackend.radiantengineering.co/storage/app/public/" +
                          v?.projectScope
                        }
                        target="_blank"
                      >
                        <i className="fa fa-eye mx-2" />
                      </a>
                    )}
                    {(globalState?.user.role == "1" ||
                      globalState?.user.role == "2" || ( globalState?.user.role == "4" && globalState?.user.isTL )) && (
                      <i
                        className="fa fa-edit mx-2"
                        onClick={() => navigate("/edit-project/" + v?.id)}
                      ></i>
                    )}

                    {/* <i className="fa fa-trash "></i> */}
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

export default ProjectTable;
