const multer = require("multer");

const path = require("path");

const endPoint = path.resolve("temp");

const storage = multer.diskStorage({
  destination: endPoint,
  filename: (req, file, cb) => {
    const fileName = Date.now() + "_" + file.originalname;
    cb(null, fileName)
  },
});

const limits = {
  fileSize: 5 * 1024 * 1024,
};
const upload = multer({
  storage,
  limits,
});

module.exports = upload;
