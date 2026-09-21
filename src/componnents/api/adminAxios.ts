import axios, { AxiosResponse } from "axios";

const adminAxios = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
  validateStatus: function (status) {
    return status >= 200 && status < 500; 
  },
});

adminAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    
    if (response.status === 401 && response.config.url === '/auth/me') {
       return {
         ...response,
         data: { user: null }
       };
    }
    return response;
  },
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      if (error.config.url !== '/auth/me') {
        window.location.href = "/authpage"; 
      }
    }
    return Promise.reject(error);
  }
);

export default adminAxios;