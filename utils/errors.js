const ERROR_CODES = {
  VALIDATION_ERROR: (res) => {
    res.status(400).send({
      message: `Invalid data`,
    });
  },

  AUTHORIZATION_ERROR: (res) => {
    res.status(401).send({
      message: `Authorization required`,
    });
  },

  PERMISSION_ERROR: (res) => {
    res.status(403).send({
      message: `You do not have permission to access this resource`,
    });
  },

  NOT_FOUND: (res) => {
    res.status(404).send({
      message: `Request resource not found`,
    });
  },

  CONFLICT_ERROR: (res) => {
    res.status(409).send({
      message: `User already exists`,
    });
  },

  INTERNAL_SERVER_ERROR: (res) => {
    res.status(500).send({
      message: `An error has accurred on the server`,
    });
  },
};
module.exports = ERROR_CODES;
