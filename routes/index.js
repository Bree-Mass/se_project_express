const router = require("express").Router();
const clothingItemRoutes = require("./clothingItems");
const userRoutes = require("./users");
const { NotFoundError } = require("../utils/errors");

router.use("/", clothingItemRoutes);
router.use("/", userRoutes);
router.use((req, res, next) => {
  next(new NotFoundError("Resource was not found"));
});

module.exports = router;
