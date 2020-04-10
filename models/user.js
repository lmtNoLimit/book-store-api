const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  token: {
    type: String,
  },
});

userSchema.methods = {
  toJSON() {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.token;
    return userObject;
  },
  async generateToken() {
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    user.token = token;
    await user.save();
    return token;
  },
};

// find user
userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });
  // if user not found
  if (!user) {
    throw new Error("Username or password is incorrect. Please try again");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  // if password is not match
  if (!isMatch) {
    throw new Error("Username or password is incorrect. Please try again");
  }
  // if everything ok
  return user;
};

// hash the password
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
