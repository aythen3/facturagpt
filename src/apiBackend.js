import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://facturagpt.com/api',
  // baseURL: "http://localhost:3001/service/v1",
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
});

export default axiosInstance;

export const apiUrl = "https://facturagpt.com";
export const googleClientId =
  "949239713939-qekjnevrr2ajimi3ime831ud32regoac.apps.googleusercontent.com";


