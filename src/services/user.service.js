import axios from 'axios';

// Define your API base URL
// const BASE_URL = "https://ermbackend.radiantengineering.co/public/api/";
const BASE_URL = "https://ermbackend.radiantengineering.co/public/api/";

const access_token = localStorage.getItem("access_token");

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
export const login = async (formData) => {
  try {
    const response = await axios.post(BASE_URL+"login" , formData);
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const resetPassword = async (formData) => {
  try {
    const response = await axios.post(BASE_URL+"reset-password" , formData);
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const addEmployee = async (formData) => {
  try {
    const response = await axios.post(BASE_URL+"add-employee" , formData, getConfig());
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const getEmployee = async (formData) => {
  try {
    const response = await axios.post(BASE_URL+"get-employees" , formData, getConfig());
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const signUp = async (formData) => {
  try {
    const response = await axios.post(BASE_URL+"store-user", formData);
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const editProfile = async (formData) => {
  try {
    const response = await axios.post(BASE_URL+"update-profile", formData, getConfig());
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const editEmployeeByAdmin = async (id, formData) => {
  try {
    const response = await axios.post(BASE_URL+"update-employees/"+id, formData, getConfig());
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const changePassword = async (formData) => {
  try {
    const response = await axios.post(BASE_URL+"update-password", formData, config);
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const addContactQuery = async (formData) => {
  try {
    const response = await axios.post(BASE_URL+"store-query", formData);
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const getAllQueryForAdmin = async () => {
  try {
    const response = await axios.get(BASE_URL+"query-list",  config);
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const addOrderApi = async (formData) => {
  try {
    const response = await axios.post(BASE_URL+"order", formData, config);
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const getOrderList = async () => {
  try {
    const response = await axios.get(BASE_URL+"user-orders",  config);
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const getProductTypeCount = async () => {
  try {
    const response = await axios.get(BASE_URL+"product-type-count");
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};

//  client api 
export const addClient = async (formData) => {
  try {
    const response = await axios.post(BASE_URL+"add-client", formData, config);
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getClients = async () => {
  try {
    const response = await axios.get(BASE_URL+"get-clients",  getConfig());
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const markUserAttendence = async (formData) => {
  try {
    const response = await axios.post(BASE_URL+"make-attendance",formData,   getConfig());
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getMonthlyReportApi = async (formData) => {
  try {
    const response = await axios.post(BASE_URL+"my-monthly-attendance",formData,   getConfig());
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};



export const employeeAttendenceReport = async (formData) => {
  try {
    const response = await axios.post(BASE_URL+"employees-monthly-attendance",formData,   getConfig());
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getStatics = async () => {
  try {
    const response = await axios.get(BASE_URL+"my-analytics",   getConfig());
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const applyLeaveApplication = async (formData) => {
  console.log(formData)
  try {
    const response = await axios.post(BASE_URL+"apply-leave", formData,  getConfig());
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getListOfLeaveApplication = async () => {
  try {
    const response = await axios.get(BASE_URL+"my-leave-applications",   getConfig());
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getListOfAllLeaveApplication = async () => {
  try {
    const response = await axios.get(BASE_URL+"list-leave-applications",   getConfig());
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const updateLeaveStatus = async (formData) => {
  try {
    const response = await axios.post(BASE_URL+"update-leave-status/"+formData.leaveId, formData,   getConfig());
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const addEmpRating = async (formData) => {
  try {
    const response = await axios.post(BASE_URL+"rate-employee", formData,   getConfig());
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const addTeamLeader = async (formData) => {
  try {
    const response = await axios.post(BASE_URL+"assign-tl-to-project", formData,   getConfig());
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const removeTeamLeader = async (formData) => {
  try {
    const response = await axios.post(BASE_URL+"remove-tl-from-project", formData,   getConfig());
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const getTeamLeaders = async () => {
  try {
    const response = await axios.get(BASE_URL+"list-tl",   getConfig());
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const getTeamList = async (project_id) => {
  try {
    const response = await axios.post(BASE_URL+"list-team-members", {project_id},   getConfig());
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const getTeamListForAdmin = async (project_id) => {
  try {
    const response = await axios.post(BASE_URL+"project-wise-team", {project_id},   getConfig());
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const sendNotification = async (formData) => {
  try {
    const response = await axios.post(BASE_URL+"send-message-to-all", formData,   getConfig());
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const sendMessage = async (formData) => {
  try {
    const response = await axios.post(BASE_URL+"send-message/"+formData?.id, formData,   getConfig());
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const getMessage = async () => {
  try {
    const response = await axios.get(BASE_URL+"get-message",   getConfig());
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const deleteMessage = async (id) => {
  try {
    const response = await axios.delete(BASE_URL+"delete-message/"+id,   getConfig());
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const getEmployeeById = async (id) => {
  try {
    const response = await axios.get(BASE_URL+"employees/"+id ,  getConfig());
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};