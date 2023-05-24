const express = require("express");

const router = express.Router();

const { validateBody } = require("../../middlewares");
const { shemas } = require("../../models/user");

router.post("/register", validateBody(shemas.registerSchema));

module.exports = router;
