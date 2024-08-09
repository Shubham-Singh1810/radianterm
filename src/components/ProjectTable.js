import React, { useEffect, useState } from "react";
import { getProjectList } from "../services/project.service";
function ProjectTable({status}) {
  const [projectList, setProjectList]=useState([])
  const getProjectListFunc = async () => {
    try {
      let response = await getProjectList( status );
      setProjectList(response.data.projects);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProjectListFunc();
  }, [status]);
  return (
    <div className="mt-3 mx-4 border rounded shadow-sm" style={{overflow:"auto"}}>
      <table class="table table-striped">
        <thead>
          <tr className="">
            <th scope="col">S.no</th>
            <th scope="col">Project Name</th>
            <th scope="col">Client</th>
            <th scope="col">Location</th>
            <th scope="col">Discription</th>
            <th scope="col">Cost</th>
            <th scope="col">Area</th>
            <th scope="col">
              <div className="d-flex justify-content-end">
                <div>Action</div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
        
            {projectList?.map((v, i)=>{
                return(
                    <tr>
                    <th scope="row" className="pt-4">
                      {i + 1}.
                    </th>
                    <td>
                      <div className="d-flex">
                        
                        <div className="ms-2 my-auto">
                          <h6 className="mb-0">{v?.name}</h6>
                          
                        </div>
                      </div>
                    </td>
                    <td className="pt-4">{v?.client}</td>
                    <td className="pt-4">{v?.location} </td>
                    <td className="pt-4">{v?.projectDescription} </td>
                    <td className="pt-4">{v?.projectCost} </td>
                    <td className="pt-4">{v?.developmentArea} </td>
                    <td className="pt-4">
                      <div className="d-flex justify-content-end">
                        <i className="fa fa-eye "></i>
                        <i className="fa fa-edit mx-2"></i>
                        <i className="fa fa-trash "></i>
                        {/* {v?.isAdmin=="0" && <i className="fa fa-trash" onClick={()=>handleDelete(v?.id)}></i>} */}
                      </div>
                    </td>
                  </tr>
                )
            })}
           
        </tbody>
      </table>
    </div>
  );
}

export default ProjectTable;
