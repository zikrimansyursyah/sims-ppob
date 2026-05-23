const express = require("express");
const { USER_ROLE } = require("../config/constants");
const authorize = require("../middlewares/auth");
const serviceController = require("../controllers/service.controller");
const router = express.Router();

router.get("/", authorize([USER_ROLE.admin, USER_ROLE.member]), serviceController.getServices);

module.exports = router;
