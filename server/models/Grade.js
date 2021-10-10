const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GradeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  year: {
    type: Schema.Types.ObjectId,
    ref: "year",
  },
  createdAd: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("grades", GradeSchema);
