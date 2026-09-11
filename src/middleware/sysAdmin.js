function sysAdmin(req, res, next) {
  if (!req.user.isSysAdmin) {
    return res.status(403).send("Access Denied");
  }
  next();
}

module.exports = sysAdmin;
