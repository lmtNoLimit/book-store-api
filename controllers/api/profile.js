const User = require("../../models/user");

module.exports.getOne = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.update = async (req, res) => {
  const updates = Object.keys(req.body);
  const validUpdates = ["name", "password"];
  const isValidate = updates.every((update) => validUpdates.includes(update));
  if (!isValidate) {
    return res.status(400).json({ error: "Invalid update!" });
  }
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.deleteOne = async (req, res) => {
  try {
    await req.user.remove();
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json(error);
  }
};
