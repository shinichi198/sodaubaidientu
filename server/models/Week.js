const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const WeekSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    year: {
      type: Schema.Types.ObjectId,
      ref: "Years",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("weeks", WeekSchema);
