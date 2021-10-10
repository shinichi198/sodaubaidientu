const express = require("express");
const router = express.Router();
const Class = require("../models/Class");
const Year = require("../models/Year");
const verifyToken = require("../middleware/auth");

//@route GET api/lops
//@desc Get class
//@access Private

router.get("/", verifyToken, async (req, res) => {
  try {
    const isActive = true;
    const years = await Year.findOne({ isActive }).populate("_id");
    const classs = await Class.find(years._id);
    res.json({ success: true, class: classs });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//@route POST api/lops
//@desc Create class
//@access Private
router.post("/", verifyToken, async (req, res) => {
  const { name, grade, year } = req.body;
  if (!name || !grade || !year)
    return res
      .status(400)
      .json({ success: false, message: "Name, grade or year is required" });
  try {
    const lops = await Class.findOne({ name, grade, year });
    if (lops)
      return res.status(400).json({ success: false, message: "Class already" });
    const newClass = new Class({
      name,
      grade,
      year,
    });
    await newClass.save();
    res.json({
      success: true,
      message: "Create successfully",
      class: newClass,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//@route PUT api/lops
//@desc Update class
//@access Private
router.put("/:id", verifyToken, async (req, res) => {
  const { name, grade, year } = req.body;
  if (!name)
    return res
      .status(400)
      .json({ success: false, message: "Name is required!" });
  try {
    let updatedClass = {
      name,
      grade,
      year,
    };
    const classupdatedcondition = { _id: req.params.id };
    updatedClass = await Class.findOneAndUpdate(
      classupdatedcondition,
      updatedClass,
      { new: true }
    );
    res.json({ success: true, message: "Successfully", class: updatedClass });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
//@route DELETE api/lops
//@desc Delete class
//@access Private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const classDeleteCondition = { _id: req.params.id };
    const deleteClass = await Class.findOneAndDelete(classDeleteCondition);
    if (!deleteClass)
      return res.status(401).json({
        success: false,
        message: "Lớp học không tìm thấy hoặc bạn chưa đăng nhập",
      });
    res.json({ success: true, class: deleteClass });
  } catch (err) {
    res.status(500).json({ success: false, message: "Máy chủ lỗi" });
  }
});
module.exports = router;
