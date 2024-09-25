const router = require("express").Router();
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");

router.get("/items", getClothingItems);
router.post("/items", auth, createClothingItem);
router.delete("/items/:itemId", auth, deleteClothingItem);
router.put("/items/:itemId/likes", auth, likeItem);
router.delete("/items/:itemId/likes", auth, dislikeItem);

module.exports = router;
