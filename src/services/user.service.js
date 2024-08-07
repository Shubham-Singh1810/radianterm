import axios from 'axios';

// Define your API base URL
const BASE_URL = "https://erm.onclicksolution.com/public/api/";

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