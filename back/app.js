const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const messagesRouter = require("./controllers/messages");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

logger.info("yhdistetään MongoDB");

mongoose
  .connect(config.MONGODB_URI)
  .then((result) => {
    logger.info("yhdistetty MongoDB!");
  })
  .catch((error) => {
    logger.error("ongelmia MongoDB:hen yhdistämisessä", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/messages", messagesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
