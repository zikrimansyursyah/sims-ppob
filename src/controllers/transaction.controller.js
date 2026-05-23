const CONSTANTS = require("../config/constants");
const transactionService = require("../services/transaction.service");

const getBalance = async (req, res, next) => {
  try {
    const balanceService = await transactionService.getBalance(req.user.email);
    return res.status(CONSTANTS.HTTP_STATUS.SUCCESS).json({
      status: 0,
      message: "Get Balance Berhasil",
      data: balanceService,
    });
  } catch (error) {
    next(error);
  }
};

const topUp = async (req, res, next) => {
  try {
    const topUpService = await transactionService.topUp({ email: req.user.email, top_up_amount: req.body.top_up_amount });
    return res.status(CONSTANTS.HTTP_STATUS.SUCCESS).json({
      status: 0,
      message: "Top Up Balance Berhasil",
      data: topUpService,
    });
  } catch (error) {
    next(error);
  }
};

const createTransaction = async (req, res, next) => {
  try {
    const transactionServiceResult = await transactionService.createTransaction({
      email: req.user.email,
      service_code: req.body.service_code,
    });
    return res.status(CONSTANTS.HTTP_STATUS.SUCCESS).json({
      status: 0,
      message: "Transaksi berhasil",
      data: transactionServiceResult,
    });
  } catch (error) {
    next(error);
  }
};

const getTransactionHistory = async (req, res, next) => {
  try {
    const historyService = await transactionService.getTransactionHistory(req.user.email, Number(req.query.offset), Number(req.query.limit));
    return res.status(CONSTANTS.HTTP_STATUS.SUCCESS).json({
      status: 0,
      message: "Get History Berhasil",
      data: historyService,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBalance,
  topUp,
  createTransaction,
  getTransactionHistory,
};
