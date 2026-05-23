const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");

const createNewUserBalances = async (userId, options = { transaction: undefined }) => {
  return await sequelize.query(
    `INSERT INTO user_balances (user_id, balance) VALUES (:user_id, 0)
     ON CONFLICT (user_id) DO NOTHING;`,
    {
      type: QueryTypes.INSERT,
      replacements: {
        user_id: userId,
      },
      plain: true,
      ...(options.transaction && { transaction: options.transaction }),
    },
  );
};

const getBalanceByEmail = async (email, options = { transaction: undefined }) => {
  return await sequelize.query(
    `SELECT COALESCE(ub.balance, 0) AS balance
     FROM users u
     LEFT JOIN user_balances ub ON ub.user_id = u.id
     WHERE u.email = :email
       AND u.deleted_at IS NULL
       AND u.is_active IS TRUE
     LIMIT 1;`,
    {
      type: QueryTypes.SELECT,
      replacements: { email },
      plain: true,
      ...(options.transaction && { transaction: options.transaction }),
    },
  );
};

const lockUserBalanceByUserId = async (userId, options = { transaction: undefined }) => {
  return await sequelize.query(
    `SELECT balance
     FROM user_balances
     WHERE user_id = :user_id
     FOR UPDATE;`,
    {
      type: QueryTypes.SELECT,
      replacements: { user_id: userId },
      plain: true,
      ...(options.transaction && { transaction: options.transaction }),
    },
  );
};

const createTransaction = async (data = {}, options = { transaction: undefined }) => {
  return await sequelize
    .query(
      `INSERT INTO transactions (user_id, service_id, invoice_number, transaction_type, transaction_status, payment_method, total_amount, balance_before, balance_after, service_code_snapshot, service_name_snapshot, service_tariff_snapshot, description, metadata, created_by, created_at)
       VALUES (:user_id, :service_id, :invoice_number, :transaction_type, :transaction_status, :payment_method, :total_amount, :balance_before, :balance_after, :service_code_snapshot, :service_name_snapshot, :service_tariff_snapshot, :description, :metadata, :created_by, NOW()) RETURNING id, created_at;`,
      {
        type: QueryTypes.INSERT,
        replacements: {
          user_id: data.user_id,
          service_id: data.service_id,
          invoice_number: data.invoice_number,
          transaction_type: data.transaction_type,
          transaction_status: data.transaction_status,
          payment_method: data.payment_method,
          total_amount: data.total_amount,
          balance_before: data.balance_before,
          balance_after: data.balance_after,
          service_code_snapshot: data.service_code_snapshot,
          service_name_snapshot: data.service_name_snapshot,
          service_tariff_snapshot: data.service_tariff_snapshot,
          description: data.description,
          metadata: data.metadata,
          created_by: data.created_by,
        },
        plain: true,
        ...(options.transaction && { transaction: options.transaction }),
      },
    )
    .then((result) => (result && result.id ? result : (result?.[0] && result?.[0]) || null));
};

const createUserBalanceHistory = async (data = {}, options = { transaction: undefined }) => {
  return await sequelize.query(
    `INSERT INTO user_balance_histories (user_id, transaction_id, type, amount, balance_before, balance_after, description, created_at)
     VALUES (:user_id, :transaction_id, :type, :amount, :balance_before, :balance_after, :description, NOW());`,
    {
      type: QueryTypes.INSERT,
      replacements: {
        user_id: data.user_id,
        transaction_id: data.transaction_id,
        type: data.type,
        amount: data.amount,
        balance_before: data.balance_before,
        balance_after: data.balance_after,
        description: data.description,
      },
      plain: true,
      ...(options.transaction && { transaction: options.transaction }),
    },
  );
};

const getTransactionHistoryByUserId = async (userId, offset = 0, limit = 10, options = { transaction: undefined }) => {
  return await sequelize.query(
    `SELECT t.invoice_number, t.transaction_type, ubh.description, t.total_amount, t.created_at AS created_on
     FROM user_balance_histories ubh
     JOIN transactions t ON t.id = ubh.transaction_id
     WHERE ubh.user_id = :user_id
     ORDER BY ubh.created_at DESC
     OFFSET :offset LIMIT :limit;`,
    {
      type: QueryTypes.SELECT,
      replacements: {
        user_id: userId,
        offset,
        limit,
      },
      ...(options.transaction && { transaction: options.transaction }),
    },
  );
};

const updateUserBalance = async (userId, newBalance, options = { transaction: undefined }) => {
  return await sequelize.query(
    `UPDATE user_balances
     SET balance = :balance,
         updated_by = :user_id,
         updated_at = NOW()
     WHERE user_id = :user_id;`,
    {
      type: QueryTypes.UPDATE,
      replacements: {
        user_id: userId,
        balance: newBalance,
      },
      plain: true,
      ...(options.transaction && { transaction: options.transaction }),
    },
  );
};

module.exports = {
  createNewUserBalances,
  getBalanceByEmail,
  lockUserBalanceByUserId,
  createTransaction,
  createUserBalanceHistory,
  getTransactionHistoryByUserId,
  updateUserBalance,
};
