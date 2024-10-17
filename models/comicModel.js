const mongoose = require("mongoose");

const comicSchema = mongoose.Schema(
  {
    bookName: { type: String, required: true },
    authorName: { type: String, required: true },
    yearOfPublication: { type: Number, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    numberOfPages: { type: Number, required: true },
    condition: { type: String, required: true, enum: ["new", "used"] },
    description: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const Comic = mongoose.model("Comic", comicSchema);

module.exports = Comic;
