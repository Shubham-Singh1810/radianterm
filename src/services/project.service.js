import axios from 'axios';

// Define your API base URL
const BASE_URL = "https://erm.onclicksolution.com/public/api/";

const access_token = localStorage.getItem("access_token")
const config = {
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
    Authorization: `Bearer ${access_token}`
  },
};
const getConfig = ()=>{
  return(
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      },
    }
  )
}
export const addProject = async (formData) => {
  try {
    const response = await axios.post(BASE_URL+"add-project" , formData, getConfig());
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const getProjectList = async (status) => {
  try {
    const response = await axios.get(BASE_URL+"get-projects" , {...getConfig(), params:{status}});
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const addTaskApi = async (formData) => {
  try {
    const response = await axios.post(BASE_URL+"create-task" ,formData, getConfig());
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getTaskList = async () => {
  try {
    const response = await axios.get(BASE_URL+"list-all-task" , getConfig());
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const updateTask = async (id, formData) => {
  try {
    const response = await axios.post(BASE_URL+"edit-task-status/"+id ,formData, getConfig());
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const editTask = async (id, formData) => {
  try {
    const response = await axios.post(BASE_URL+"edit-task/"+id ,formData, getConfig());
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};