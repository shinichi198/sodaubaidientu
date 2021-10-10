const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");
const verifyToken = require("../middleware/auth");

//@route GET appi/subjects
//@desc Get Subjects
//@access Private

router.get("/", verifyToken, async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json({ success: true, subject: subjects });
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  }
});

//@route POST appi/subjects
//@desc Create Subjects
//@access Private

router.post("/", verifyToken, async (req, res) => {
  const { name } = req.body;
  if (!name)
    res
      .status(400)
      .json({ success: false, message: "Tên môn học không được rỗng" });
  try {
    const subject = await Subject.findOne({ name });
    if (subject)
      return res.status(400).json({
        success: false,
        message: "Tên môn học đã tồn tại trong hệ thống!",
      });
    const newSubject = new Subject({ name });
    await newSubject.save();
    res.json({
      success: true,
      message: "Thêm mới Môn học thành công!",
      subject: newSubject,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Lỗi máy chủ",
    });
  }
});

//@route PUT appi/subjects
//@desc Update Subjects
//@access Private
router.put("/:id", verifyToken, async (req, res) => {
  const { name } = req.body;
  if (!name)
    return res
      .status(400)
      .json({ success: false, message: "Tên Môn học không được rỗng" });
  try {
    let updatedSubject = { name };
    const subjectupdatedCondition = { _id: req.params.id };
    updatedSubject = await Subject.findOneAndUpdate(
      subjectupdatedCondition,
      updatedSubject,
      { new: true }
    );
    res.json({
      success: true,
      message: "Cập nhật Môn học thành công",
      subject: updatedSubject,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Lỗi máy chủ",
    });
  }
});

//@route DELETE appi/subjects
//@desc Delete Subjects
//@access Private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const subjectDeleteCondition = { _id: req.params.id };
    const deletedSubject = await Subject.findOneAndDelete(
      subjectDeleteCondition
    );
    if (!deletedSubject)
      return res.status(401).json({
        success: false,
        message: "Không tìm thầy Môn học cần xóa hoặc bạn chưa đăng nhập",
      });
    res.json({ success: true, subject: deletedSubject });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Lỗi máy chủ",
    });
  }
});
module.exports = router;
