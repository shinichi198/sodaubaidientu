const express = require("express");
const router = express.Router();
const Toprecoder = require("../models/Toprecoder");
const verifyToken = require("../middleware/auth");
const mongoose = require("mongoose");
const User = require("../models/User");
const LockClass = require("../models/LockClass");
//@route GET api/dashboards
//@desc Get toprecoder
//@access Private
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const data = await Toprecoder.aggregate([
      {
        $facet: {
          totalData: [
            {
              $match: {
                user: mongoose.Types.ObjectId(req.params.id),
              },
            },
            //User
            {
              $lookup: {
                from: "users",
                let: { user_id: "$user" },
                pipeline: [
                  { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                  { $project: { password: 0 } },
                ],
                as: "user",
              },
            },
            //array->object
            { $unwind: "$user" },
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

            {
              $lookup: {
                from: "subjects",
                let: { subject_id: "$subject" },
                pipeline: [
                  { $match: { $expr: { $eq: ["$_id", "$$subject_id"] } } },
                ],
                as: "subject",
              },
            },
            { $unwind: "$subject" },
            //Sorting
            { $sort: { thu: 1 } },
          ],
          totalCount: [
            {
              $match: {
                user: mongoose.Types.ObjectId(req.params.id),
              },
            },
            { $count: "count" },
          ],
        },
      },
      {
        $project: {
          count: { $arrayElemAt: ["$totalCount.count", 0] },
          totalData: 1,
        },
      },
    ]);
    const recoder = data[0].totalData;
    const total = data[0].count;
    // console.log(recoder);
    res.json({ success: true, recoder, total });
  } catch (err) {
    console.log(err);
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const dashboard = await Toprecoder.find();
    res.json({ success: true, dashboard: dashboard });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//@route POST api/dashboards
//@desc Create toprecoder
//@access Private

router.post("/", verifyToken, async (req, res) => {
  const {
    thu,
    ngay,
    cahoc,
    tiet,
    subject,
    tietCT,
    tenbai,
    nhanxet,
    xeploai,
    hocsinh,
    grade,
    lophoc,
    week,
    user,
  } = req.body;
  const check = await Toprecoder.findOne({ week, tiet, lophoc, cahoc, thu });
  if (check) {
    const _id = check.user;
    const users = await User.findOne({ _id });
    return res.json({
      success: true,
      message: `Tiết học này đã có giáo viên ${users.name} ký rồi`,
    });
  }
  try {
    const newRecoder = new Toprecoder({
      thu,
      ngay,
      cahoc,
      tiet,
      subject,
      tietCT,
      tenbai,
      nhanxet,
      xeploai,
      hocsinh,
      user,
      grade,
      lophoc,
      week,
    });
    await newRecoder.save();
    const data = await Toprecoder.aggregate([
      {
        $facet: {
          totalData: [
            {
              $match: {
                _id: newRecoder._id,
              },
            },
            //User
            {
              $lookup: {
                from: "users",
                let: { user_id: "$user" },
                pipeline: [
                  { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                  { $project: { password: 0 } },
                ],
                as: "user",
              },
            },
            //array->object
            { $unwind: "$user" },
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
            {
              $lookup: {
                from: "subjects",
                let: { subject_id: "$subject" },
                pipeline: [
                  { $match: { $expr: { $eq: ["$_id", "$$subject_id"] } } },
                ],
                as: "subject",
              },
            },
            { $unwind: "$subject" },
            //Sorting
            { $sort: { thu: 1 } },
          ],
        },
      },
    ]);
    const recoder = data[0].totalData;
    res.json({
      success: true,
      message: "Thêm mới tiết dạy thành công!",
      dashboard: recoder,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  }
});

//@route DELETE api/dashboards
//@desc Delete dashboards
//@access Private

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const iddashboard = { _id: req.params.id };
    // const check = await Toprecoder.findOne(iddashboard);
    // if (check) {
    //   const lophoc = check.lophoc;
    //   const week = check.week;

    //   const check2 = await LockClass.findOne({ lophoc, week });
    //   if (check2) {
    //     return res.json({
    //       success: false,
    //       message: "Sổ đầu bài đã bị khóa",
    //     });
    //   }
    // }
    const deleteDashboard = await Toprecoder.findOneAndDelete(iddashboard);
    if (!deleteDashboard) {
      return res.status(401).json({
        success: false,
        message: "Tiết học không tìm thấy hoặc bạn chưa đăng nhập",
      });
    }
    res.json({ success: true, dashboard: deleteDashboard });
  } catch (err) {
    res.status(500).json({ success: false, message: "Máy chủ lỗi" });
  }
});

module.exports = router;
