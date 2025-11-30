import axios from "axios";

const Main = axios.create({
  baseURL: import.meta.env.VITE_Main_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});
export default Main;
