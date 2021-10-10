const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SubjectSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("subjects", SubjectSchema);
