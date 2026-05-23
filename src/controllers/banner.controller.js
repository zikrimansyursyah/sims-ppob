const CONSTANTS = require("../config/constants");
const logger = require("../config/logger");
const bannerService = require("../services/banner.service");

const getBanners = async (req, res, next) => {
  try {
    const banners = await bannerService.getBanners();
    return res.status(CONSTANTS.HTTP_STATUS.SUCCESS).json({
      status: 0,
      message: "Sukses",
      data: banners,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBanners,
};
