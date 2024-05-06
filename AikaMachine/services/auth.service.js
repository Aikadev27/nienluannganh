import axios from "./express.service";

// done
export const Login = async (form) => {
  try {
    const res = await axios.post("/user/login", form);
    // console.log("tra ve tu server", res.data);
    return { userData: res.data };
  } catch (error) {
    console.log("lỗi khi gửi từ client", error);
    return { userData: null };
  }
};

// done
export const LogOut = async (userId) => {
  try {
    const res = await axios.patch(`/user/logOut/${userId}`);
    console.log("du lieu tra ve sau khi logout:", res.data);
    return true;
  } catch (error) {
    console.log("Lỗi ở hàm Logout", error);
    return false;
  }
};

// done
export const updateInfo = async (userId, updatedInfo) => {
  try {
    const res = await axios.patch(`/user/updateInfo/${userId}`, updatedInfo);
    return res.data;
  } catch (error) {
    console.log("Lỗi tại hàm updateInfo ở client", error);
  }
};

// done
export const Register = async (regisForm) => {
  try {
    const res = await axios.post("/user/register", regisForm);
    return res.data;
  } catch (error) {
    console.log("Lỗi tại hàm Register ở client", error);
  }
};
