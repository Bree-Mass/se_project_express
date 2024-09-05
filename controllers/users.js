const User = require("../models/user");
const ERROR_CODES = require("../utils/errors");

module.exports.getUsers = (req, res) => {
  User.find({})

    .then((users) => res.send({ data: users }))
    .catch((err) => {
      console.error("Error fetching users:", err.name);
      ERROR_CODES.INTERNAL_SERVER_ERROR(res);
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
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

module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      console.error("Error creating user:", err.name);
      if (err.name === "ValidationError") {
        ERROR_CODES.VALIDATION_ERROR(res);
      } else {
        ERROR_CODES.INTERNAL_SERVER_ERROR(res);
      }
    });
};
