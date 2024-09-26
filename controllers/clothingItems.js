const ClothingItem = require("../models/clothingItem");
const ERROR_CODES = require("../utils/errors");

module.exports.getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error("Error fetching clothing items:", err.name);
      ERROR_CODES.INTERNAL_SERVER_ERROR(res);
    });
};

module.exports.createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error("Error creating clothing item:", err.name);
      if (err.name === "ValidationError") {
        ERROR_CODES.VALIDATION_ERROR(res);
      } else {
        ERROR_CODES.INTERNAL_SERVER_ERROR(res);
      }
    });
};

module.exports.deleteClothingItem = (req, res) => {
  ClothingItem.findById(req.params.itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        return ERROR_CODES.PERMISSION_ERROR(res);
      }
      return ClothingItem.findByIdAndRemove(req.params.itemId).then(() =>
        res.send({ message: "Item successfully deleted" })
      );
    })
    .catch((err) => {
      console.error("Error deleting clothing item:", err.name);
      if (err.name === "CastError") {
        ERROR_CODES.VALIDATION_ERROR(res);
      } else if (err.name === "DocumentNotFoundError") {
        ERROR_CODES.NOT_FOUND(res);
      } else {
        ERROR_CODES.INTERNAL_SERVER_ERROR(res);
      }
    });
};

module.exports.likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error("Error liking clothing item:", err.name);
      if (err.name === "CastError") {
        ERROR_CODES.VALIDATION_ERROR(res);
      } else if (err.name === "DocumentNotFoundError") {
        ERROR_CODES.NOT_FOUND(res);
      } else {
        ERROR_CODES.INTERNAL_SERVER_ERROR(res);
      }
    });
};

module.exports.dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error("Error liking clothing item:", err.name);
      if (err.name === "CastError") {
        ERROR_CODES.VALIDATION_ERROR(res);
      } else if (err.name === "DocumentNotFoundError") {
        ERROR_CODES.NOT_FOUND(res);
      } else {
        ERROR_CODES.INTERNAL_SERVER_ERROR(res);
      }
    });
};
