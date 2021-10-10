const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  grade: {
    type: Schema.Types.ObjectId,
    ref: "greads",
  },
  year: {
    type: Schema.Types.ObjectId,
    ref: "year",
  },
});

module.exports = mongoose.model("class", ClassSchema);
