const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.text());
routes(app);

app.use(errorHandler);

module.exports = app;
