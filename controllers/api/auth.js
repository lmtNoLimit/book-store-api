const User = require("../../models/user");

module.exports.register = async (req, res) => {
  const user = new User(req.body);
  const isExist = await User.find({ username: req.body.username });
  if (isExist) {
    return res.status(400).json({ message: "User is already exist" });
  }
  try {
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.username,
      req.body.password
    );
    const token = await user.generateToken();
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.status(200).json({ success: "Logged out!" });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).json({ success: "Logged out all devices!" });
  } catch (error) {
    res.status(500).json(error);
  }
};
