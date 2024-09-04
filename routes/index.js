const router = require("express").Router();
const clothingItemRoutes = require("./clothingItems");
const userRoutes = require("./users");

router.use("/", clothingItemRoutes);
router.use("/", userRoutes);

module.exports = router;
