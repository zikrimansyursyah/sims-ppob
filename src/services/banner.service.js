const bannerRepository = require("../repositories/banner.repository");

const getBanners = async () => {
  try {
    const banners = await bannerRepository.getActiveBanners();
    return banners;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getBanners,
};
