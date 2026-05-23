const { HTTP_STATUS, RESPONSE_STATUS } = require("../config/constants");
const AppError = require("../lib/app-error");
const { verify } = require("../lib/jwt");

const authorize = (allowedRoles = []) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError("Token tidak tidak valid atau kadaluwarsa", HTTP_STATUS.UNAUTHORIZED, RESPONSE_STATUS.TOKEN_EXPIRED);
      }

      const token = authHeader.split(" ")[1];

      req.user = verify(token);
      if (!req.user) {
        throw new AppError("Token tidak tidak valid atau kadaluwarsa", HTTP_STATUS.UNAUTHORIZED, RESPONSE_STATUS.TOKEN_EXPIRED);
      }

      if (allowedRoles.length > 0) {
        const userRole = req.user.role;

        const isAuthorized = allowedRoles.includes(userRole);
        if (!isAuthorized) {
          throw new AppError("Anda tidak memiliki hak akses untuk menu ini", HTTP_STATUS.FORBIDDEN, RESPONSE_STATUS.FORBIDDEN_ACCESS);
        }
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = authorize;
