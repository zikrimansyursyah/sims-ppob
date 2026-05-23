const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({ status: 0 });
});
router.put("/update", (req, res) => {
  return res.status(200).json({ status: 0 });
});
router.put("/image", (req, res) => {
  return res.status(200).json({ status: 0 });
});

module.exports = router;
