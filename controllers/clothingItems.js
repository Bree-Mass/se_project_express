const ClothingItem = require("../models/clothingItem");
const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require("../utils/errors");

module.exports.getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      if (err.name === "CastError") {
        next(err);
      } else {
        next(err);
      }
    });
};

module.exports.createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.log(err.name, err.message);
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid input data"));
      } else {
        next(err);
      }
    });
};

module.exports.deleteClothingItem = (req, res, next) => {
  ClothingItem.findById(req.params.itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        return next(
          new ForbiddenError("You do not have permission for this action")
        );
      }
      return ClothingItem.findByIdAndRemove(req.params.itemId).then(() =>
        res.send({ message: "Item successfully deleted" })
      );
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("The id string is in an invalid format"));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Document not found"));
      } else {
        next(err);
      }
    });
};

module.exports.likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("The id string is in an invalid format"));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Document not found"));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("The id string is in an invalid format"));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Document not found"));
      } else {
        next(err);
      }
    });
};
