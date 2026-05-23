require("dotenv").config();

const app = require("./app");
const logger = require("./config/logger");
const { sequelize } = require("./models");

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    app.listen(PORT, async () => {
      await sequelize
        .authenticate()
        .then(() => {
          logger.info("Database connected");
        })
        .catch(() => {
          logger.error("Can't connect database");
        });
      logger.info(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error(error);
  }
}

startServer();
