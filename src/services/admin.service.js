import axios from 'axios';

// Define your API base URL
const BASE_URL = "https://manishdesignstudio.in/manishdesignbackend/public/api/";

const user = JSON.parse(localStorage.getItem("manish_design_user"))

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
    Authorization: `Bearer ${user?.access_token}`
  },
};


export const userListFunc = async (formData) => {
    try {
      const response = await axios.get(BASE_URL+"get-all-user",config);
      return (response);
    } catch (error) {
      // Handle error (e.g., log or throw an error)
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  export const deleteUser = async (id) => {
    try {
      const response = await axios.delete(BASE_URL+"delete-user/"+id, config);
      return (response);
    } catch (error) {
      // Handle error (e.g., log or throw an error)
      console.error('Error fetching data:', error);
      throw error;
    }
};
export const addProducr = async (formData) => {
    try {
      const response = await axios.post(BASE_URL+"add-product",formData, config);
      return (response);
    } catch (error) {
      // Handle error (e.g., log or throw an error)
      console.error('Error fetching data:', error);
      throw error;
    }
};
export const editProduct = async (formData, id) => {
  try {
    const response = await axios.post(BASE_URL+"edit-product/"+id,formData, config);
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const getProducts  = async () => {
    try {
      const response = await axios.get(BASE_URL+"product-list",config);
      return (response);
    } catch (error) {
      // Handle error (e.g., log or throw an error)
      console.error('Error fetching data:', error);
      throw error;
    }
};
export const deleteProduct = async (id) => {
 
    try {
      const response = await axios.delete(BASE_URL+"delete-product/"+id, config);
      return (response);
    } catch (error) {
      // Handle error (e.g., log or throw an error)
      console.error('Error fetching data:', error);
      throw error;
    }
};
export const adminStatics = async (id) => {
    try {
      const response = await axios.get(BASE_URL+"statistics-count", config);
      return (response);
    } catch (error) {
      // Handle error (e.g., log or throw an error)
      console.error('Error fetching data:', error);
      throw error;
    }
};


