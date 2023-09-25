const express = require("express");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

routes(app);

app.use(errorHandler);

module.exports = app;
