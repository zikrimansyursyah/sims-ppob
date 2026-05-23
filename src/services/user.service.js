const { RESPONSE_STATUS, HTTP_STATUS } = require("../config/constants");
const AppError = require("../lib/app-error");
const { startTransaction, commitTransaction, rollbackTransaction } = require("../repositories/base.repository");
const userRepository = require("../repositories/user.repository");

const getProfile = async (email) => {
  try {
    const user = await userRepository.findByEmail(email, true, { columns: ["u.email", "u.first_name", "u.last_name", "u.profile_image_url as profile_image"] });
    if (!user) {
      throw new AppError("User tidak ditemukan", HTTP_STATUS.NOT_FOUND, RESPONSE_STATUS.DATA_NOT_FOUND);
    }

    return { profile: user };
  } catch (error) {
    throw error;
  }
};

const updateProfile = async (payload) => {
  const transaction = await startTransaction();
  try {
    const user = await userRepository.findByEmail(payload.email, true, { columns: ["u.id"], transaction });
    if (!user) {
      throw new AppError("User tidak ditemukan", HTTP_STATUS.NOT_FOUND, RESPONSE_STATUS.DATA_NOT_FOUND);
    }

    await userRepository.updateUserDataById(
      user.id,
      {
        first_name: payload.first_name,
        last_name: payload.last_name,
      },
      { transaction },
    );

    await commitTransaction(transaction);
    return;
  } catch (error) {
    await rollbackTransaction(transaction);
    throw error;
  }
};

const updateProfileImage = async (payload) => {
  const transaction = await startTransaction();
  try {
    const user = await userRepository.findByEmail(payload.email, true, { columns: ["u.id"], transaction });
    if (!user) {
      throw new AppError("User tidak ditemukan", HTTP_STATUS.NOT_FOUND, RESPONSE_STATUS.DATA_NOT_FOUND);
    }

    await userRepository.updateUserDataById(
      user.id,
      {
        profile_image: payload.profile_image,
      },
      { transaction },
    );

    await commitTransaction(transaction);
    return;
  } catch (error) {
    await rollbackTransaction(transaction);
    throw error;
  }
};

module.exports = {
  getProfile,
  updateProfile,
  updateProfileImage,
};
