import React,{useState, useEffect} from 'react'
import {getTeamList, getTeamListForAdmin} from "../services/user.service";
import { getProjectList } from "../services/project.service";
import { ToastContainer, toast } from "react-toastify";
import { useGlobalState } from "../GlobalProvider";
function ViewTeamMembers() {
    const { globalState } = useGlobalState();
    const [teamListArr, setTeamListArr]=useState([]);
    const [projectId, setProjectId]=useState()
    const getMemberList = async ()=>{
        try {
            let response = await getTeamList(projectId);
            setTeamListArr(response?.data?.teamMembers)
            if(response?.data?.message=="You are not assigned to this project"){
                toast.error(response?.data?.message)
            }
        } catch (error) {
            
        }
    }
    const getMemberListForAdmin = async ()=>{
        try {
            let response = await getTeamListForAdmin(projectId);
            setTeamListArr(response?.data?.teamMembers)
            if(response?.data?.message=="No team members found for this project"){
                toast.warning(response?.data?.message)
            }
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        getProjectListFunc();
    },[])
    useEffect(()=>{
        if(globalState?.user?.role=="1" || globalState?.user?.role=="2"){
            getMemberListForAdmin()
        }else{
            getMemberList();
        }
        
    },[projectId])
    const [projectList, setProjectList]=useState([])
  const getProjectListFunc = async () => {
    try {
      let response = await getProjectList();
      setProjectList(response.data.projects);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
    <div className='row p-0 justify-content-end mt-4 mx-4'>
        <div className='col-md-6  col-lg-3 col-12'>
        
        <select className='ms-2 form-control' onChange={(e)=>setProjectId(e.target.value)}>
            <option value="">Select Project</option>
            {projectList?.map((v, i)=>{
                return(
                    <option value={v?.id} >{v?.name}</option>
                )
            })}
        </select>
        </div>
    </div>
      <div className="mt-3 mx-4 border rounded shadow-sm" style={{overflow:"auto"}}>
        <table class="table table-striped">
          <thead>
            <tr className="">
              <th scope="col">S.no</th>
              <th scope="col">Name</th>
              <th scope="col">Contact</th>
              <th scope="col">Department</th>
              <th scope="col">Designation</th>
            </tr>
          </thead>
          <tbody>
           {teamListArr?.map((v, i)=>{
            return(
                <tr>
                    <td scope="row" className="">
                    {i + 1}.
                  </td>
                  <td scope="row" className="">
                    {v?.name}
                  </td>
                  <td scope="row" className="">
                    {v?.contact}
                  </td>
                  <td scope="row" className="">
                    {v?.department}
                  </td>
                  <td scope="row" className="">
                    {v?.designation}
                  </td>
                </tr>
            )
           })}
          </tbody>
        </table>
      </div>
      <ToastContainer/>
    </>
  )
}

export default ViewTeamMembers