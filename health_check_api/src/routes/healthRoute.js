const express = require("express");
const router = express.Router();
const healthController = require("../controllers/healthController");
const { MethodNotAllowedError } = require("../errors/applicationError");

router.get("/", healthController.checkHealth);
router.all("/", (req, res, next) => {
  next(new MethodNotAllowedError());
});

module.exports = router;
