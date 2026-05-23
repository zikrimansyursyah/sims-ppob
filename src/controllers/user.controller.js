const CONSTANTS = require("../config/constants");
const logger = require("../config/logger");
const { hash } = require("../lib/bcrypt");
const AppError = require("../lib/app-error");
const userService = require("../services/user.service");

const getProfile = async (req, res, next) => {
  try {
    const profileService = await userService.getProfile(req.user.email);
    return res.status(CONSTANTS.HTTP_STATUS.SUCCESS).json({
      status: 0,
      message: "Sukses",
      data: profileService.profile,
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    // update profile
    await userService.updateProfile({ ...req.body, email: req.user.email });

    // get updated profile
    const getProfile = await userService.getProfile(req.user.email);
    return res.status(CONSTANTS.HTTP_STATUS.SUCCESS).json({
      status: 0,
      message: "Update Profile berhasil",
      data: getProfile.profile,
    });
  } catch (error) {
    next(error);
  }
};

const updateProfileImage = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new AppError("File tidak ditemukan. Gunakan form-data dengan key file.", CONSTANTS.HTTP_STATUS.VALIDATION_ERROR, CONSTANTS.RESPONSE_STATUS.INVALID_PARAMETERS);
    }

    const profileImageUrl = `${req.protocol}://${req.get("host")}/public/profile-images/${req.file.filename}`;

    await userService.updateProfileImage({ email: req.user.email, profile_image: profileImageUrl });

    const getProfile = await userService.getProfile(req.user.email);
    return res.status(CONSTANTS.HTTP_STATUS.SUCCESS).json({
      status: 0,
      message: "Profile image berhasil diperbarui",
      data: getProfile.profile,
    });
  } catch (error) {
    if (req.file && req.file.path) {
      const fs = require("fs");
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        logger.error(unlinkError);
      }
    }
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  updateProfileImage,
};
