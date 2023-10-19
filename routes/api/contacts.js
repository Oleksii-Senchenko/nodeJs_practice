const express = require("express");
const Contact = require("../../models/contacts");
const isValidId = require("../../middlewares/isValidId");
const HttpError = require("../../helpers/HttpError");
const addSchema = require("../../schemaJOI/conacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", isValidId, async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpError(404, "not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400);
    }
    const result = await Contact.create(req.body);
    if (!result) {
      throw HttpError(400);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", isValidId, async (req, res, next) => {
  try {
      const { error } = addSchema.validate(req.body);
      if (error) {
        throw HttpError(400);
      }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});
router.patch("/:contactId", isValidId, async (req, res, next) => {
  try {
      const { error } = addSchema.validate(req.body);
      if (error) {
        throw HttpError(400);
      }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});
router.delete("/:contactId", isValidId, async (req, res, next) => {
  try {
    
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
