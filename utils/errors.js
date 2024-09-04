const ERROR_CODES = {
  BAD_REQUEST: (res, err) => {
    res.status(400).send({
      message: `${err}`,
    });
  },

  VALIDATION_ERROR: (res, err) => {
    res.status(400).send({
      message: `${err}`,
    });
  },

  NOT_FOUND: (res, err) => {
    res.status(404).send({
      message: `${err}`,
    });
  },

  INTERNAL_SERVER_ERROR: (res, err) => {
    res.status(500).send({
      message: `${err}`,
    });
  },
};
module.exports = ERROR_CODES;
