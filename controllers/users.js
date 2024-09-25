const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const JWT_SECRET = require("../utils/config");
const ERROR_CODES = require("../utils/errors");

// module.exports.getUsers = (req, res) => {
//   User.find({})
//     .then((users) => res.send({ data: users }))
//     .catch((err) => {
//       console.error("Error fetching users:", err.name);
//       ERROR_CODES.INTERNAL_SERVER_ERROR(res);
//     });
// };

// module.exports.getUser = (req, res) => {
//   User.findById(req.params.id)
//     .orFail()
//     .then((user) => res.send({ data: user }))
//     .catch((err) => {
//       console.error("Error fetching user:", err.name);
//       if (err.name === "CastError") {
//         ERROR_CODES.VALIDATION_ERROR(res);
//       } else if (err.name === "DocumentNotFoundError") {
//         ERROR_CODES.NOT_FOUND(res);
//       } else {
//         ERROR_CODES.INTERNAL_SERVER_ERROR(res);
//       }
//     });
// };

module.exports.createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const { password, ...userWithoutPassword } = user.toObject();
      res.status(201).send({ data: userWithoutPassword });
    })
    .catch((err) => {
      console.error("Error creating user:", err.name);
      if (err.name === "ValidationError") {
        ERROR_CODES.VALIDATION_ERROR(res);
      } else if (err.name === "MongoServerError") {
        ERROR_CODES.CONFLICT_ERROR(res);
      } else {
        ERROR_CODES.INTERNAL_SERVER_ERROR(res);
      }
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return ERROR_CODES.VALIDATION_ERROR(res);
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.error("Error logging in:", err.name);
      console.error("Error logging in:", err.message);
      if (err.message === "Incorrect email or password") {
        ERROR_CODES.AUTHORIZATION_ERROR(res);
      } else {
        ERROR_CODES.INTERNAL_SERVER_ERROR(res);
      }
    });
};

module.exports.getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.error("Error fetching user:", err.name);
      if (err.name === "CastError") {
        ERROR_CODES.VALIDATION_ERROR(res);
      } else if (err.name === "DocumentNotFoundError") {
        ERROR_CODES.NOT_FOUND(res);
      } else {
        ERROR_CODES.INTERNAL_SERVER_ERROR(res);
      }
    });
};

module.exports.patchCurrentUser = (req, res) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.error("Error fetching user:", err.name);
      if (err.name === "ValidationError" || err.name === "CastError") {
        ERROR_CODES.VALIDATION_ERROR(res);
      } else if (err.name === "DocumentNotFoundError") {
        ERROR_CODES.NOT_FOUND(res);
      } else {
        ERROR_CODES.INTERNAL_SERVER_ERROR(res);
      }
    });
};
