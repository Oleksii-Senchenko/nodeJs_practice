const userController = require("../../controllers/userControllers");

const express = require("express");
const authenticate = require("../../middlewares/authenticate");
const validateBody = require("../../middlewares/validateBody");
const { registerSchema, loginSchema } = require("../../schemaJOI/user");
const upload = require("../../middlewares/upload");
require("dotenv").config();
const router = express.Router();

router.post("/register",validateBody(registerSchema), userController.register);
router.post("/login",validateBody(loginSchema), userController.login);

router.get('/current', authenticate, userController.current )

router.patch('/avatars', authenticate, upload.single('avatar'), userController.updateAvatar )

module.exports = router;
