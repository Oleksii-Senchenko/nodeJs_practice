const userControllers = require("../../controllers/userControllers");

const express = require("express");
const validateBody = require("../../middlewares/validateBody");
const { registerSchema, loginSchema } = require("../../schemaJOI/user");
const authenticate = require("../../middlewares/authenticate");
require("dotenv").config();
const router = express.Router();

router.post(
  "/register",
  validateBody(registerSchema),
  userControllers.register
);
router.post("/login", validateBody(loginSchema), userControllers.login);

router.post("/logout",authenticate, userControllers.logout);
router.get("/current", authenticate, userControllers.current);
module.exports = router;
