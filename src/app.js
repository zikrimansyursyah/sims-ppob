const express = require("express");
const app = express();

/* Middlewares */
const { initialMiddleware, onErrorMiddleware, onNotFoundMiddleware } = require("./middlewares");
initialMiddleware.forEach((middleware) => {
  app.use(middleware);
});

/* Routes */
const allRoutes = require("./routes");
app.use("/", allRoutes);

app.use("/", onNotFoundMiddleware);
app.use(onErrorMiddleware);

module.exports = app;
