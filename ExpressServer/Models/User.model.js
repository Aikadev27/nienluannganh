const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    email: String,
    password: String,
    fullName: String,
    // gender: Boolean,
    avatarImage: String,
    address: String,
    phoneNumber: String,
    about: String,
    isLogin: { type: Boolean, default: false },
    role: { type: Number, default: 1 },
    historyPredict: {
      type: [
        {
          modelName: String,
          predictImage: String,
          labelResult: String,
          accuracy: Number,
        },
      ],
      default: [],
    },
  },
  {
    timestamps: false,
  }
);

module.exports = model("User", UserSchema);
