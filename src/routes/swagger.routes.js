const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../config/swagger");

const router = express.Router();

router.use("/", swaggerUi.serveFiles(swaggerDocument, { explorer: true }));
router.get("/", swaggerUi.setup(swaggerDocument, { explorer: true, swaggerOptions: { persistAuthorization: true } }));

module.exports = router;
