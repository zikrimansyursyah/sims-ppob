const express = require("express");
const { USER_ROLE } = require("../config/constants");
const authorize = require("../middlewares/auth");
const userController = require("../controllers/user.controller");
const { updateProfileSchema } = require("../validations/user.validation");
const { validate } = require("../middlewares/body-schema");
const { uploadProfileImage } = require("../middlewares/file-upload");
const router = express.Router();

router.get("/", authorize([USER_ROLE.member]), userController.getProfile);
router.put("/update", authorize([USER_ROLE.member]), validate("body", updateProfileSchema), userController.updateProfile);
router.put("/image", authorize([USER_ROLE.member]), uploadProfileImage.single("file"), userController.updateProfileImage);

module.exports = router;
