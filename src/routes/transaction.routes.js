const express = require("express");
const { USER_ROLE } = require("../config/constants");
const authorize = require("../middlewares/auth");
const { validate } = require("../middlewares/body-schema");
const transactionController = require("../controllers/transaction.controller");
const { topUpSchema, paymentSchema, transactionHistorySchema } = require("../validations/transaction.validation");
const router = express.Router();

router.get("/balance", authorize([USER_ROLE.member]), transactionController.getBalance);
router.post("/topup", authorize([USER_ROLE.member]), validate("body", topUpSchema), transactionController.topUp);
router.post("/transaction", authorize([USER_ROLE.member]), validate("body", paymentSchema), transactionController.createTransaction);
router.get("/transaction/history", authorize([USER_ROLE.member]), validate("query", transactionHistorySchema), transactionController.getTransactionHistory);

module.exports = router;
