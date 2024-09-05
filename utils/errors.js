const ERROR_CODES = {
  VALIDATION_ERROR: (res) => {
    res.status(400).send({
      message: `Invalid data`,
    });
  },

  NOT_FOUND: (res) => {
    res.status(404).send({
      message: `Request resource not found`,
    });
  },

  INTERNAL_SERVER_ERROR: (res) => {
    res.status(500).send({
      message: `An error has accurred on the server`,
    });
  },
};
module.exports = ERROR_CODES;
