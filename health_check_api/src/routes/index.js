const healthRoute = require("./healthRoute");
const assignmentsRoute = require("./assignmentsRoute"); // Import your assignments route
const { EndpointnotFound } = require("../errors/applicationError");
const authenticate = require("../middleware/authenticate"); // Import the authentication middleware

module.exports = (app) => {
  app.use("/healthz", healthRoute);
  app.use("/v1/assignments", authenticate, assignmentsRoute);
  app.all("*", (req, res, next) => {
    next(new EndpointnotFound());
  });
};
