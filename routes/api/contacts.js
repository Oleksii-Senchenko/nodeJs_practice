const express = require("express");
const Contact = require("../../models/contacts");
const isValidId = require("../../middlewares/isValidId");
const HttpError = require("../../helpers/HttpError");
const addSchema = require("../../schemaJOI/conacts");
const contactControllers = require("../../controllers/contactControllers");
const router = express.Router();

router.get("/", contactControllers.getAll);


router.get("/:contactId", contactControllers.getById
);

router.post("/", contactControllers.add);

router.put("/:contactId", contactControllers.update);
router.patch("/:contactId", contactControllers.update);


router.delete("/:contactId",contactControllers.remove);

module.exports = router;
