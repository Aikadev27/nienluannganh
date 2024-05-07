const UserModel = require("../Models/User.model");

class UserController {
  hello(req, res) {
    res.send("hello world");
  }

  // done
  async login(req, res) {
    try {
      const { email, password } = req.body;
      console.log("email", email);
      console.log("pass", password);
      const findUserByEmail = await UserModel.findOne({ email: email });
      if (!findUserByEmail) {
        return res
          .status(404)
          .json("email not correct! check your email please!");
      } else if (findUserByEmail.password !== password) {
        return res.status(404).json("password not correct!");
      }
      findUserByEmail.isLogin = true;
      const returnUserData = {
        email: findUserByEmail.email,
        fullName: findUserByEmail.fullName,
        avatar: findUserByEmail.avatarImage,
        userId: findUserByEmail._id,
        role: findUserByEmail.role,
        isLogin: findUserByEmail.isLogin,
        gender: findUserByEmail.gender,
        phone: findUserByEmail.phoneNumber,
        address: findUserByEmail.address,
        about: findUserByEmail.about,
      };
      await findUserByEmail.save();
      // return res.status(200).json("Login successfully!");
      res.send(returnUserData);
    } catch (error) {
      console.log(error);
      res.status(500).json("login failed");
    }
  }

  // done
  async register(req, res) {
    try {
      const duplicateMail = await UserModel.findOne({ email: req.body.email });
      console.log(req.body);
      if (duplicateMail) {
        return res.status(404).send("email existed!");
      }
      const newUser = await UserModel.create({ ...req.body });
      res.send(newUser);
      console.log("new user", newUser);
    } catch (error) {
      console.log(error);
      res.status(500).send("create user failed");
    }
  }
  // done
  async updateInfo(req, res) {
    const userId = req.params._id;
    try {
      console.log(req.body);
      const user = await UserModel.findByIdAndUpdate(userId, req.body, {
        new: true,
      });

      if (user) {
        const returnUserData = {
          email: user.email,
          fullName: user.fullName,
          avatar: user.avatarImage,
          userId: user._id,
          role: user.role,
          isLogin: user.isLogin,
          gender: user.gender,
          phone: user.phoneNumber,
          address: user.address,
          about: user.about,
        };
        res.send(returnUserData);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }

  async deleteOneUser(req, res) {
    const userId = req.params._id;
    try {
      const user = await UserModel.findByIdAndDelete(userId);

      if (!user) {
        return res.status(404).send("user not found");
      }
      res.send("da xoa user");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await UserModel.find(
        {},
        "-historyPredict -isLogin  -password -__v"
      );
      res.send(users);
    } catch (error) {
      console.log(error);
    }
  }

  // done
  async logOut(req, res) {
    try {
      const userId = req.params._userId;
      console.log("id cua user khi log out", userId);
      const foundUser = await UserModel.findById(userId);
      console.log(foundUser);
      if (!foundUser) {
        res.send("user not found when log out");
      }
      foundUser.isLogin = false;
      await foundUser.save();

      res.send("dang xuat thanh cong");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = new UserController();

/**

 * đăng nhập => phân quyền
admin: tìm kiếm theo tên, tìm kiếm bằng email, sort các tài khoản theo thời gian tạo
 *
 */
