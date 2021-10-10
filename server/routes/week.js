const express = require("express");
const router = express.Router();
const Week = require("../models/Week");
const Year = require("../models/Year");
const verifyToken = require("../middleware/auth");

//@route GET appi/weeks
//@desc Get Weeks
//@access Private

router.get("/", verifyToken, async (req, res) => {
  try {
    const isActive = true;
    const years = await Year.findOne({ isActive }).populate("_id");
    const weeks = await Week.find(years._id);
    res.json({ success: true, week: weeks });
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  }
});

//@route POST appi/weeks
//@desc Create Weeks
//@access Private

router.post("/", verifyToken, async (req, res) => {
  const { name, startDate, endDate, year } = req.body;
  if (!name || !year)
    return res
      .status(400)
      .json({ success: false, message: "Tên tuần, năm học không được rỗng" });
  try {
    const week = await Week.findOne({ name, year });
    if (week)
      return res.status(400).json({
        success: false,
        message: "Tên tuần đã tồn tại trong hệ thống",
      });
    const newWeek = new Week({
      name,
      startDate: startDate || "",
      endDate: endDate || "",
      year,
    });
    await newWeek.save();
    res.json({
      success: true,
      message: "Thêm mới tuần thành công!",
      week: newWeek,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  }
});

//@route PUT appi/weeks
//@desc Update Weeks
//@access Private
router.put("/:id", verifyToken, async (req, res) => {
  const { name, startDate, endDate, year } = req.body;
  if (!name || !year)
    return res
      .status(400)
      .json({ success: false, message: "Tên tuần không được rỗng" });
  try {
    let updatedWeek = {
      name,
      startDate: startDate || "",
      endDate: endDate || "",
      year,
    };
    const weekupdatedCondition = { _id: req.params.id };
    updatedWeek = await Week.findOneAndUpdate(
      weekupdatedCondition,
      updatedWeek,
      { new: true }
    );
    res.json({
      success: true,
      message: "Cập nhật Tuần thành công",
      week: updatedWeek,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  }
});

//@route DELETE appi/weeks
//@desc delete Weeks
//@access Private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const weekDeleteCondition = { _id: req.params.id };
    const deleteWeek = await Week.findOneAndDelete(weekDeleteCondition);
    if (!deleteWeek)
      return res.status(401).json({
        success: false,
        message: "Không tìm thấy tuần cần xóa hoặc bạn chưa đăng nhập",
      });
    res.json({ success: true, week: deleteWeek });
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  }
});

module.exports = router;
