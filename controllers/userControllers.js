const HttpError = require("../helpers/HttpError");
const tryHandler = require("../middlewares/tryCathHandler");
const bcrypt = require("bcryptjs");
const User = require("../models/auth");
const gravatar = require("gravatar");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;
class UserController {
  register = tryHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, "Email in use");
    }

    const hashpass = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(email);

    const newUser = await User.create({
      ...req.body,
      password: hashpass,
      avatarURL,
    });
    res.status(201).json({
      status: 201,
      data: {
        email: newUser.email,
        subscription: newUser.subscriprion,
        avatarURL,
      },
    });
  });

  login = tryHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Password or Email is wrong");
    }

    const comparePass = await bcrypt.compare(password, user.password);

    if (!comparePass) {
      throw HttpError(401, "Password or Email is wrong");
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "12h" });

    await User.findByIdAndUpdate(user._id, { token });

    res.json({
      status: 201,
      data: {
        email: user.email,
        subscriprion: user.subscriprion,
        token,
      },
    });
  });

  current = async (req, res, next) => {
    const { subscriprion, email } = req.user;

    res.json({
      code: 200,
      data: {
        user: {
          email,
          subscriprion,
        },
      },
    });
  };
  updateAvatar = tryHandler(async (req, res, next) => {
    const { path: tempFile, filename } = req.file;

    const resultUpload = path.join(
      __dirname,
      "../",
      "public",
      "avatars",
      filename
    );

    await fs.renameSync(tempFile, resultUpload);

    const avatarURL = path.join("public", "avatars", filename);

    res.json({
      avatarURL,
    });
  });
}

module.exports = new UserController();
