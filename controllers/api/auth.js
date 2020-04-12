const User = require("../../models/user");

module.exports.register = async (req, res) => {
  const user = new User(req.body);
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
    req.user.token = null;
    await req.user.save();
    res.status(200).json({ success: "Logged out!" });
  } catch (error) {
    res.status(500).json(error);
  }
};
