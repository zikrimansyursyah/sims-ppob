const CONSTANTS = require("../config/constants");
const logger = require("../config/logger");
const serviceService = require("../services/service.service");

const getServices = async (req, res, next) => {
  try {
    const services = await serviceService.getServices();
    return res.status(CONSTANTS.HTTP_STATUS.SUCCESS).json({
      status: 0,
      message: "Sukses",
      data: services,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getServices,
};
