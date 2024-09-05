const router = require("express").Router();
const clothingItemRoutes = require("./clothingItems");
const userRoutes = require("./users");
const ERROR_CODES = require("../utils/errors");

router.use("/", clothingItemRoutes);
router.use("/", userRoutes);
router.use((req, res) => {
  ERROR_CODES.NOT_FOUND(res);
});

module.exports = router;
