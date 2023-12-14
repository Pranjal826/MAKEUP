const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

const userModel = new mongoose.Schema({
  username: {
      type: String,
      unique: true,
      required: [true, "Username is required!"],
      minLength: [4, "Username field must have at least 4 characters"],
  },
  email: {
      type: String,
      lowercase: true,
      required: [true, "Email is required!"],
      unique:true
  },
  password: {
      type: String,
  },
  phone: {
      type: String,
      unique: true,
  },
  dp:{
    type:String,
  },
 
  accounttype:String,
  resetPasswordOtp: {
    type: Number,
    default: -1,
  },

});

userModel.plugin(plm);

module.exports = mongoose.model("user", userModel);