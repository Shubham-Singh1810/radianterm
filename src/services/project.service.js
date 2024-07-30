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

export const addProject = async (formData) => {
  try {
    const response = await axios.post(BASE_URL+"add-project" , formData, config);
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};


