const basicAuth = require("basic-auth");
const { Account, Assignment } = require("../models");
const bcrypt = require("bcrypt");
const { unauthorized } = require("../errors/applicationError");

const authenticate = async (req, res, next) => {
  const user = basicAuth(req);
  console.log(user);
  console.log("inside the authenticate");
  if (!user || !user.name || !user.pass) {
    return next(new unauthorized());
    //   return res.status(401).send({ message: "Authentication required" });
  }

  const email = user.name; // basicAuth uses "name" for the username part
  const password = user.pass;
  const hashedIncomingPassword = bcrypt.hashSync(password, 10);

  try {
    const account = await Account.findOne({ where: { email: email } });

    const match = bcrypt.compareSync(password, account.password);
    if (account && match) {
      next(); // authentication successful
    } else {
      return next(new unauthorized());
    }
  } catch (error) {
    console.error("error:", error);
    return res.status(400).send();
  }
};

module.exports = authenticate;
