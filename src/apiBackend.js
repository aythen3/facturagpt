import axios from "axios";

// http://212.47.230.77:5984/

const axiosInstance = axios.create({
  baseURL: 'https://facturagpt.com/api',
  // baseURL: "http://localhost:3006/api",
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
});

export default axiosInstance;

export const apiUrl = "https://facturagpt.com";
// export const apiUrl = "http://localhost:3006";
export const googleClientId =
  "949239713939-qekjnevrr2ajimi3ime831ud32regoac.apps.googleusercontent.com";
