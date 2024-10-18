const router = require("express").Router();
const {
  createUser,
  login,
  getCurrentUser,
  patchCurrentUser,
} = require("../controllers/users");
const auth = require("../middlewares/auth");
const {
  validateUserBody,
  validateLogin,
} = require("../middlewares/validation");

router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateLogin, login);
router.get("/users/me", auth, getCurrentUser);
router.patch("/users/me", auth, patchCurrentUser);

module.exports = router;
