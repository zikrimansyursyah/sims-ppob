const { RESPONSE_STATUS, HTTP_STATUS, USER_ROLE } = require("../config/constants");
const AppError = require("../lib/app-error");
const { compare, hash } = require("../lib/bcrypt");
const { sign, verify } = require("../lib/jwt");
const { startTransaction, commitTransaction, rollbackTransaction } = require("../repositories/base.repository");
const userRepository = require("../repositories/user.repository");

const login = async (payload) => {
  const transaction = await startTransaction();
  try {
    // check email
    const user = await userRepository.findByEmail(payload.email, true, { columns: ["u.id", "u.email", "u.role", "u.password"], transaction });
    if (!user) {
      throw new AppError("Email tidak ditemukan", HTTP_STATUS.NOT_FOUND, RESPONSE_STATUS.DATA_NOT_FOUND);
    }

    // validate password
    const isPasswordValid = await compare(payload.password, user.password);
    if (!isPasswordValid) {
      throw new AppError("Password tidak sesuai", HTTP_STATUS.BAD_REQUEST, RESPONSE_STATUS.INVALID_CREDENTIALS);
    }

    const tokenData = {
      email: user.email,
      role: user.role,
    };

    const token = sign(tokenData);

    // update last login
    await userRepository.updateAfterLogin(user.id, { transaction });

    await commitTransaction(transaction);
    return {
      token: token,
    };
  } catch (error) {
    await rollbackTransaction(transaction);
    throw error;
  }
};

const registration = async (payload) => {
  const transaction = await startTransaction();
  try {
    // check email
    const user = await userRepository.findByEmail(payload.email, undefined, { columns: ["u.id"], transaction });
    if (user) {
      throw new AppError("Email sudah digunakan", HTTP_STATUS.BAD_REQUEST, RESPONSE_STATUS.DATA_ALREADY_EXISTS);
    }

    // hash password
    const hashedPassword = await hash(payload.password);

    // insert user baru
    await userRepository.createNewUser(
      {
        email: payload.email,
        role: USER_ROLE.member,
        password: hashedPassword,
        first_name: payload.first_name,
        last_name: payload.last_name,
        profile_image: null,
        is_active: true,
      },
      {
        transaction,
      },
    );

    await commitTransaction(transaction);
    return null;
  } catch (error) {
    await rollbackTransaction(transaction);
    throw error;
  }
};

module.exports = {
  login,
  registration,
};
