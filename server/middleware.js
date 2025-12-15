module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res
      .status(401)
      .json({ status: "error", message: "You must be logged in" });
  }
  next();
};
