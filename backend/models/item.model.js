const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  itemname: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
