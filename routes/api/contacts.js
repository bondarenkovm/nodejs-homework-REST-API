const express = require("express");

const router = express.Router();

const {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
} = require("../../controllers/contacts-controller");

const { shemas } = require("../../models/contact");
const { validateBody, isValidId } = require("../../middlewares");

router.get("/", getAllContacts);
router.get("/:contactId", isValidId, getContactById);
router.post("/", validateBody(shemas.addShema), addContact);
router.put(
  "/:contactId",
  isValidId,
  validateBody(shemas.addShema),
  updateContact
);
router.delete("/:contactId", isValidId, deleteContact);

module.exports = router;
