const HttpError = require("../helpers/HttpError");
const tryHandler = require("../helpers/tryCathHandler");
const Contact = require("../models/contacts");
const addSchema = require("../schemaJOI/conacts");

class ContactController {
  getAll = tryHandler(async (req, res, next) => {
    const result = await Contact.find();
    res.status(200);
    res.json({ code: 200, message: "ok", data: result, qty: result.length });
  });

  getById = tryHandler(async (req, res, next) => {
    const { contactId } = req.params;

    const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  });

  add = tryHandler(async (req, res, next) => {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400);
    }
    const result = await Contact.create(req.body);
    if (!result) {
      throw HttpError(400);
    }
    res.status(201);
    res.json({ code: 201, message: "ok", data: result });
  });

  update = tryHandler(async (req, res, next) => {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400);
    }
    const result = await Contact.create(req.body);
    if (!result) {
      throw HttpError(400);
    }
    res.status(201);
    res.json({ code: 201, message: "ok", data: result });
  });

  remove = tryHandler(async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  });
}
module.exports = new ContactController();
