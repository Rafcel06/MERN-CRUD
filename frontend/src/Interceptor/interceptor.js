import axios from 'axios';
import { environtment } from "../Environment/environment";

const axiosInstance = axios.create({
  baseURL: environtment.api,  
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized access, please log in');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
