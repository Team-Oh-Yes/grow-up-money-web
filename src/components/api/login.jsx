import axios from "axios";

const Sign = axios.create({
  baseURL: import.meta.env.VITE_Signup_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default Sign;
