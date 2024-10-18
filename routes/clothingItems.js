const router = require("express").Router();
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");
const { validateCardBody, validateId } = require("../middlewares/validation");

router.get("/items", getClothingItems);
router.post("/items", validateCardBody, auth, createClothingItem);
router.delete("/items/:itemId", validateId, auth, deleteClothingItem);
router.put("/items/:itemId/likes", validateId, auth, likeItem);
router.delete("/items/:itemId/likes", validateId, auth, dislikeItem);

module.exports = router;
