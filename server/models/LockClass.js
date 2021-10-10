const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LockClassSchema = new Schema(
  {
    lophoc: {
      type: Schema.Types.ObjectId,
      ref: "class",
    },
    week: {
      type: Schema.Types.ObjectId,
      ref: "weeks",
    },
    grade: {
      type: Schema.Types.ObjectId,
      ref: "grades",
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("lockclass", LockClassSchema);
