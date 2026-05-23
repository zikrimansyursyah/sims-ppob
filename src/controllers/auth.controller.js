const CONSTANTS = require("../config/constants");
const logger = require("../config/logger");
const { hash } = require("../lib/bcrypt");
const authService = require("../services/auth.service");

const registration = async (req, res, next) => {
  try {
    const registrationService = await authService.registration(req.body);
    return res.status(CONSTANTS.HTTP_STATUS.SUCCESS).json({
      status: 0,
      message: "Registrasi berhasil silahkan login",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const loginService = await authService.login(req.body);
    return res.status(CONSTANTS.HTTP_STATUS.SUCCESS).json({
      status: 0,
      message: "Login Sukses",
      data: {
        token: loginService.token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registration,
  login,
};
