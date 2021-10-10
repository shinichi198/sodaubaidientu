const express = require("express");
const router = express.Router();
const LockClass = require("../models/LockClass");

const verifyToken = require("../middleware/auth");
const mongoose = require("mongoose");

router.post("/", verifyToken, async (req, res) => {
  const { lophoc, week, grade, selected } = req.body;
  const check = await LockClass.findOne({ lophoc, week, grade });
  if (check)
    return res.json({ success: false, message: "Đã tồn tại trong CSDL" });
  try {
    const newLockClass = new LockClass({
      lophoc,
      week,
      grade,
      selected,
    });
    await newLockClass.save();
    res.json({
      success: true,
      message: "Thêm thành công",
      lockclass: newLockClass,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  const { selected } = req.body;
  //console.log(req.params.id);
  try {
    let updateLockclass = {
      selected,
    };
    const lockclassupdated = { _id: req.params.id };
    updateLockclass = await LockClass.findOneAndUpdate(
      lockclassupdated,
      updateLockclass,
      { new: true }
    );
    res.json({
      success: true,
      message: "Cập nhật thành công",
      lockclass: updateLockclass,
    });
  } catch (err) {
    res.json({ success: false, message: "Lỗi máy chủ" });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const data = await LockClass.aggregate([
      {
        $facet: {
          totalData: [
            {
              $match: {
                week: mongoose.Types.ObjectId(req.params.id),
              },
            },
            //Week
            {
              $lookup: {
                from: "weeks",
                let: { week_id: "$week" },
                pipeline: [
                  { $match: { $expr: { $eq: ["$_id", "$$week_id"] } } },
                ],
                as: "tuan",
              },
            },
            { $unwind: "$week" },
            //Class
            {
              $lookup: {
                from: "classes",
                let: { class_id: "$lophoc" },
                pipeline: [
                  { $match: { $expr: { $eq: ["$_id", "$$class_id"] } } },
                  { $project: { grade: 0, week: 0 } },
                ],
                as: "_class",
              },
            },
            //array->object
            { $unwind: "$_class" },
            { $sort: { _id: 1 } },
          ],
        },
      },
    ]);
    const lockclass = data[0].totalData;
    res.json({ success: true, lockclass });
  } catch (err) {
    console.log(err);
  }
});
//@route GET api/locks
//@desc get LockClass
//@access Private
// router.get("/", verifyToken, async (req, res) => {
//   try {
//     const locks = await LockClass.find();
//     res.json({ success: true, lockclass: locks });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Lỗi máy chủ" });
//   }
// });

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const lockdelete = { _id: req.params.id };
    const deleteLock = await LockClass.findOneAndDelete(lockdelete);
    if (!deleteLock)
      return res.status(401).json({
        success: false,
        message: "Lỗi",
      });
    res.json({ success: true, lockclass: deleteLock });
  } catch (err) {
    res.status(500).json({ success: false, message: "Máy chủ lỗi" });
  }
});
module.exports = router;
