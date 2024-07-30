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
    const response = await axios.post(BASE_URL+"add-employee" , formData, config);
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const getEmployee = async (formData) => {
  try {
    const response = await axios.post(BASE_URL+"get-employees" , formData, config);
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
    const response = await axios.post(BASE_URL+"update-profile", formData, config);
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