 
import axios from 'axios';

const BASE_URL = 'https://redpositive-162t.onrender.com'; 

export const fetchData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/data`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendEmail = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/send-email`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addData = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/data`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default { fetchData, sendEmail, addData };
