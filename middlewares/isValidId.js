const { isValidObjectId } = require("mongoose");
const HttpError = require("../helpers/HttpError");

const isValidId = (req, res, next) => {
  if (!isValidObjectId) {
    return HttpError(400, "Bad request");
  }
  next();
};

module.exports = isValidId;
