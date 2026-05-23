const express = require("express");
const bannerController = require("../controllers/banner.controller");
const router = express.Router();

router.get("/", bannerController.getBanners);

module.exports = router;
