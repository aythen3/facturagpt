import axios from "axios";

const axiosInstance = axios.create({
  //baseURL: 'https://facturagpt.com/api',
  baseURL: "http://163.172.168.195:3006/api",
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
});

export default axiosInstance;

//export const apiUrl = "https://facturagpt.com";
export const apiUrl = "http://163.172.168.195:3005";
export const googleClientId =
  "949239713939-qekjnevrr2ajimi3ime831ud32regoac.apps.googleusercontent.com";
