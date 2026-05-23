const express = require("express");
const router = express.Router();

// Sub Routers
const swaggerRoutes = require("./swagger.routes");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const bannerRoutes = require("./banner.routes");
const serviceRoutes = require("./service.routes");
const transactionRoutes = require("./transaction.routes");

router.use("/", swaggerRoutes);
router.use("/", authRoutes);
router.use("/profile", userRoutes);
router.use("/banner", bannerRoutes);
router.use("/services", serviceRoutes);
router.use("/", transactionRoutes);

module.exports = router;
