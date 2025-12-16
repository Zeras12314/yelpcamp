module.exports.isLoggedIn = (req, res, next) => {
  console.log("REQ.USER...", req.user)
  if (!req.isAuthenticated()) {
    return res
      .status(401)
      .json({ status: "error", message: "You must be logged in" });
  }
  next();
};
