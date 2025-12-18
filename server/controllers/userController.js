const { asyncHandler } = require("../utils/asyncHandler");
const User = require("../models/user");
const passport = require("passport");
const Joi = require("joi");

const validateUserRegistration = (user) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
  });

  const { error, value } = schema.validate(user, { abortEarly: false });
  if (error) {
    const messages = error.details.map((d) => d.message);
    const err = new Error(messages.join(", "));
    err.statusCode = 400;
    throw err;
  }
  return value;
};

const registerUser = asyncHandler(async (req, res) => {
  validateUserRegistration(req.body);
  const { email, username, password } = req.body;
  const user = new User({ email, username });
  // password will be handled by the library (plugin), adding hash and salt
  const registeredUser = await User.register(user, password); // coming from passportLocalMongoose [user model].

  // take the registered userdata and automatically logged in - from passport
  // after the user registered, user is automatically
  req.login(registeredUser, (err) => {
    if (err) return next(err);
    res.json(registeredUser);
  });
});

const loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // coming from passportLocalMongoose [user model]
    if (err) return next(err); // internal error
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: info.message || "Invalid credentials",
      });
    }
    // Log the user in
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ status: "success", user });
    });
  })(req, res, next);
};

const logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    return res.json({ status: "success", message: "Successfully logged out" });
  });
};

const authMe = (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  authMe,
  logout,
};
