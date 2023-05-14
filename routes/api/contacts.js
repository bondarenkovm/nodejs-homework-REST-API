const express = require("express");

const router = express.Router();

const {
  getAllContacts,
  getContactId,
  postContact,
  putContact,
  deleteContact,
} = require("../../controllers/contacts-controller");

router.get("/", getAllContacts);
router.get("/:contactId", getContactId);
router.post("/", postContact);
router.put("/:contactId", putContact);
router.delete("/:contactId", deleteContact);

module.exports = router;
