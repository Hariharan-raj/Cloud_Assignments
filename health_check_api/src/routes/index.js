const healthRoute = require("./healthRoute");
const { MethodNotAllowedError } = require("../errors/applicationError");

module.exports = (app) => {
  app.use("/healthz", healthRoute);
  app.all("*", (req, res, next) => {
    next(new MethodNotAllowedError());
  });
};
