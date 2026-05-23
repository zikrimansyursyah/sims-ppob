const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { validate } = require("../middlewares/body-schema");
const { registerSchema, loginSchema } = require("../validations/auth.validation");

router.post("/registration", validate("body", registerSchema), authController.registration);
router.post("/login", validate("body", loginSchema), authController.login);

module.exports = router;
