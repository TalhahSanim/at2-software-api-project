const jwt = require("jsonwebtoken");

function authentication(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).send("Access Denied! No Token Provided");
  }
  try {
    const decoded = jwt.verify(token, process.env.API_PRIVATE_KEY);

    req.user = decoded;

    next();
  } catch (ex) {
    res.status(400).send("Invalid Token");
  }
}

module.exports = authentication;
