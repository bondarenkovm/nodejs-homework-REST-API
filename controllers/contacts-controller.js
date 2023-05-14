const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../models/contacts");

const { HttpError } = require("../helpers");

const Joi = require("joi");
const contactShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const getAllContacts = async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactId = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      throw HttpError(404, `No contact found with this ${contactId}`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const postContact = async (req, res, next) => {
  try {
    const { error } = contactShema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
const putContact = async (req, res, next) => {
  try {
    const { error } = contactShema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, `No contact found with this ${contactId}`);
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      throw HttpError(404, `No contact found with this ${contactId}`);
    }
    res.json({ message: "Сontact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactId,
  postContact,
  putContact,
  deleteContact,
};
