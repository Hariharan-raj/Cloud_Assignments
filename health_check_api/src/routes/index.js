const healthRoute = require("./healthRoute");
const { EndpointnotFound } = require("../errors/applicationError");

module.exports = (app) => {
  app.use("/healthz", healthRoute);
  app.all("*", (req, res, next) => {
    next(new EndpointnotFound());
  });
};
