import axios from "axios";
const BASE_URL = "http://192.168.1.3:3000/api";

const instance = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
