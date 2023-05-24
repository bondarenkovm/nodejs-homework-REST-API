const express = require("express");

const { register } = require("../../controllers/auth-controller");
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), register);

module.exports = router;
