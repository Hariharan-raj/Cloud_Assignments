const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/errorHandler");

const app = express();
// parse application/json
app.use(bodyParser.json());

// parse text
app.use(bodyParser.text());
routes(app);

app.use(errorHandler);

module.exports = app;
