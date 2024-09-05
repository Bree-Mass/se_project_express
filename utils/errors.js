const ERROR_CODES = {
  BAD_REQUEST: (res, err) => {
    res.status(400).send({
      message: `${err.message}`,
    });
  },

  VALIDATION_ERROR: (res, err) => {
    res.status(400).send({
      message: `${err.message}`,
    });
  },

  NOT_FOUND: (res, err) => {
    res.status(404).send({
      message: `${err.message}`,
    });
  },

  INTERNAL_SERVER_ERROR: (res, err) => {
    res.status(500).send({
      message: `${err.message}`,
    });
  },
};
module.exports = ERROR_CODES;
