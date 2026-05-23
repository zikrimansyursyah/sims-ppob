const serviceRepository = require("../repositories/service.repository");

const getServices = async () => {
  try {
    const services = await serviceRepository.getActiveServices();
    return services;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getServices,
};
