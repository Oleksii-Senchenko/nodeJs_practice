const express = require("express");

const contactControllers = require("../../controllers/contactControllers");
const authenticate = require("../../middlewares/authenticate");
const router = express.Router();

router.get("/", authenticate, contactControllers.getAll);

router.get("/:contactId", authenticate, contactControllers.getById);

router.post("/", authenticate, contactControllers.add);

router.put("/:contactId", authenticate, contactControllers.update);
router.patch("/:contactId", authenticate, contactControllers.update);

router.delete("/:contactId", authenticate, contactControllers.remove);

module.exports = router;
