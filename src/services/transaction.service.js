const { RESPONSE_STATUS, HTTP_STATUS, TRANSACTION_TYPE, TRANSACTION_STATUS, BALANCE_TYPE } = require("../config/constants");
const AppError = require("../lib/app-error");
const { generateInvoiceNumber } = require("../lib/utils");
const { startTransaction, commitTransaction, rollbackTransaction } = require("../repositories/base.repository");
const transactionRepository = require("../repositories/transaction.repository");
const userRepository = require("../repositories/user.repository");
const serviceRepository = require("../repositories/service.repository");

const getBalance = async (email) => {
  try {
    const balance = await transactionRepository.getBalanceByEmail(email);
    if (!balance) {
      throw new AppError("User tidak ditemukan", HTTP_STATUS.NOT_FOUND, RESPONSE_STATUS.DATA_NOT_FOUND);
    }

    return { balance: Number(balance.balance) };
  } catch (error) {
    throw error;
  }
};

const topUp = async (payload) => {
  const transaction = await startTransaction();
  try {
    const user = await userRepository.findByEmail(payload.email, true, { columns: ["u.id"], transaction });
    if (!user) {
      throw new AppError("User tidak ditemukan", HTTP_STATUS.NOT_FOUND, RESPONSE_STATUS.DATA_NOT_FOUND);
    }

    const balanceRow = await transactionRepository.lockUserBalanceByUserId(user.id, { transaction });
    let currentBalance = 0;
    if (balanceRow) {
      currentBalance = Number(balanceRow.balance);
    } else {
      await transactionRepository.createNewUserBalances(user.id, { transaction });
    }

    const newBalance = currentBalance + Number(payload.top_up_amount);
    const invoiceNumber = generateInvoiceNumber();

    const transactionResult = await transactionRepository.createTransaction(
      {
        user_id: user.id,
        service_id: null,
        invoice_number: invoiceNumber,
        transaction_type: TRANSACTION_TYPE.topup,
        transaction_status: TRANSACTION_STATUS.success,
        payment_method: "BANK_TRANSFER",
        total_amount: Number(payload.top_up_amount),
        balance_before: currentBalance,
        balance_after: newBalance,
        service_code_snapshot: null,
        service_name_snapshot: null,
        service_tariff_snapshot: null,
        description: "TOPUP BANK_TRANSFER",
        metadata: null,
        created_by: user.id,
      },
      { transaction },
    );

    const transactionId = transactionResult?.id || null;
    await transactionRepository.createUserBalanceHistory(
      {
        user_id: user.id,
        transaction_id: transactionId,
        type: BALANCE_TYPE.credit,
        amount: Number(payload.top_up_amount),
        balance_before: currentBalance,
        balance_after: newBalance,
        description: "TOPUP BANK_TRANSFER",
      },
      { transaction },
    );

    await transactionRepository.updateUserBalance(user.id, newBalance, { transaction });

    await commitTransaction(transaction);
    return { balance: newBalance };
  } catch (error) {
    await rollbackTransaction(transaction);
    throw error;
  }
};

const createTransaction = async (payload) => {
  const transaction = await startTransaction();
  try {
    const user = await userRepository.findByEmail(payload.email, true, { columns: ["u.id"], transaction });
    if (!user) {
      throw new AppError("User tidak ditemukan", HTTP_STATUS.NOT_FOUND, RESPONSE_STATUS.DATA_NOT_FOUND);
    }

    const service = await serviceRepository.findServiceByCode(payload.service_code, { transaction });
    if (!service) {
      throw new AppError("Service tidak ditemukan", HTTP_STATUS.NOT_FOUND, RESPONSE_STATUS.DATA_NOT_FOUND);
    }

    const balanceRow = await transactionRepository.lockUserBalanceByUserId(user.id, { transaction });
    let currentBalance = 0;
    if (balanceRow) {
      currentBalance = Number(balanceRow.balance);
    } else {
      await transactionRepository.createNewUserBalances(user.id, { transaction });
    }

    const serviceTariff = Number(service.tariff);
    if (currentBalance < serviceTariff) {
      throw new AppError("Saldo tidak mencukupi", HTTP_STATUS.BAD_REQUEST, RESPONSE_STATUS.INSUFFICIENT_BALANCE);
    }

    const newBalance = currentBalance - serviceTariff;
    const invoiceNumber = generateInvoiceNumber();

    const transactionResult = await transactionRepository.createTransaction(
      {
        user_id: user.id,
        service_id: service.id,
        invoice_number: invoiceNumber,
        transaction_type: TRANSACTION_TYPE.payment,
        transaction_status: TRANSACTION_STATUS.success,
        payment_method: "BALANCE",
        total_amount: serviceTariff,
        balance_before: currentBalance,
        balance_after: newBalance,
        service_code_snapshot: service.code,
        service_name_snapshot: service.name,
        service_tariff_snapshot: service.tariff,
        description: "PAYMENT BALANCE",
        metadata: null,
        created_by: user.id,
      },
      { transaction },
    );

    const transactionId = transactionResult?.id || null;
    const createdOn = transactionResult?.created_at ? new Date(transactionResult.created_at).toISOString() : new Date().toISOString();

    await transactionRepository.createUserBalanceHistory(
      {
        user_id: user.id,
        transaction_id: transactionId,
        type: BALANCE_TYPE.credit,
        amount: serviceTariff,
        balance_before: currentBalance,
        balance_after: newBalance,
        description: `PAYMENT ${service.code}`,
      },
      { transaction },
    );

    await transactionRepository.updateUserBalance(user.id, newBalance, { transaction });

    await commitTransaction(transaction);
    return {
      invoice_number: invoiceNumber,
      service_code: service.code,
      service_name: service.name,
      transaction_type: TRANSACTION_TYPE.payment,
      total_amount: serviceTariff,
      created_on: createdOn,
    };
  } catch (error) {
    await rollbackTransaction(transaction);
    throw error;
  }
};

const getTransactionHistory = async (email, offset = 0, limit = 10) => {
  try {
    const user = await userRepository.findByEmail(email, true, { columns: ["u.id"] });
    if (!user) {
      throw new AppError("User tidak ditemukan", HTTP_STATUS.NOT_FOUND, RESPONSE_STATUS.DATA_NOT_FOUND);
    }

    const history = await transactionRepository.getTransactionHistoryByUserId(user.id, offset, limit);
    return history;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getBalance,
  topUp,
  createTransaction,
  getTransactionHistory,
};
