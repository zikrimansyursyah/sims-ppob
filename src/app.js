const express = require("express");
const path = require("path");
const app = express();

/* Middlewares */
const { initialMiddleware, onErrorMiddleware, onNotFoundMiddleware } = require("./middlewares");
initialMiddleware.forEach((middleware) => {
  app.use(middleware);
});

app.use("/public", express.static(path.join(__dirname, "../public")));

/* Routes */
const allRoutes = require("./routes");
app.use("/", allRoutes);

app.use("/", onNotFoundMiddleware);
app.use(onErrorMiddleware);

module.exports = app;
