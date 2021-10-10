const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ToprecoderSchema = new Schema(
  {
    thu: {
      type: String,
      required: true,
    },
    ngay: {
      type: String,
      required: true,
    },
    cahoc: {
      type: Number,
      required: true,
    },
    tiet: {
      type: Number,
      required: true,
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: "subjects",
    },
    tietCT: {
      type: Number,
      required: true,
    },
    tenbai: {
      type: String,
      required: true,
    },
    nhanxet: {
      type: String,
      required: true,
    },
    xeploai: {
      type: Number,
      required: true,
    },
    hocsinh: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    grade: {
      type: Schema.Types.ObjectId,
      ref: "grades",
    },
    lophoc: {
      type: Schema.Types.ObjectId,
      ref: "class",
    },
    week: {
      type: Schema.Types.ObjectId,
      ref: "weeks",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("toprecoders", ToprecoderSchema);
