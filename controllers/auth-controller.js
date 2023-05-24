const { User } = require("../models/user");
const bcrypt = require("bcrypt");

const { HttpError, ctrlWrapper } = require("../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashedPassword });

  res.status(201).json({
    email: newUser.email,
    password: newUser.password,
  });
};
module.exports = {
  register: ctrlWrapper(register),
};
