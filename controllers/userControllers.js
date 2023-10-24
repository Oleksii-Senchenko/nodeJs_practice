const jwt = require("jsonwebtoken");
const HttpError = require("../helpers/HttpError");
const tryHandler = require("../middlewares/tryCathHandler");
const User = require("../models/auth");
const bcrypt = require("bcryptjs");
const { SECRET_KEY } = process.env;
require("dotenv").config();

class UserControllers {
  register = tryHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email in use");
    }

    const hashPass = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: hashPass });
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  });

  login = tryHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(409, "Email or password is wrong");
    }

    const comparePass = await bcrypt.compare(password, user.password);

    if (!comparePass) {
      throw HttpError(409, "Email or password is wrong");
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "12h" });

    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  });
  logout = tryHandler(async (req, res, next) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(204).json();
  });
  current = tryHandler(async (req, res, next) => {
    const { email, subscription } = req.user;
    res.json({
      email,
      subscription,
    });
  });
}
module.exports = new UserControllers();