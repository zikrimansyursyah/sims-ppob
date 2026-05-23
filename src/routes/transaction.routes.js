const express = require("express");
const router = express.Router();

router.get("/balance", (req, res) => {
  return res.status(200).json({ status: 0 });
});
router.post("/topup", (req, res) => {
  return res.status(200).json({ status: 0 });
});
router.post("/transaction", (req, res) => {
  return res.status(200).json({ status: 0 });
});
router.get("/transaction/history", (req, res) => {
  return res.status(200).json({ status: 0 });
});

module.exports = router;
