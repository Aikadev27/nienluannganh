import axios from "axios";
LOCAL_PORT = "http://192.168.1.3:5000";
CIT_PORT = "  http://10.13.129.178:5000";
NGUYEN_VU_PORT = "http://172.31.99.198:5000";

const instance = axios.create({
  baseURL: `${LOCAL_PORT}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
