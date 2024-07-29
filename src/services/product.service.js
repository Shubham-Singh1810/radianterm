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
export const getProductByCategory = async (category) => {
  try {
    const response = await axios.get(BASE_URL+"products/"+category);
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const addToCart = async (payload) => {
  try {
    const response = await axios.post(BASE_URL+"add-to-cart", payload, config);
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const getCartList = async (payload) => {
  try {
    const response = await axios.post(BASE_URL+"get-cart-products", payload, config);
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};





