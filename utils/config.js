const { JWT_SECRET = "this-is-my-backup-secret" } = process.env;

module.exports = JWT_SECRET;
