const express = require("express");
const router = express.Router();
const Toprecoder = require("../models/Toprecoder");
const verifyToken = require("../middleware/auth");
const mongoose = require("mongoose");
const User = require("../models/User");
//@route GET api/dashboards
//@desc Get toprecoder
//@access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const data = await Toprecoder.aggregate([
      {
        $facet: {
          totalData: [
            // {
            //   $match: {
            //     user: mongoose.Types.ObjectId(req.params.id),
            //   },
            // },
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
            { $sort: { thu: 1, tiet: 1 } },
          ],
          //   totalCount: [
          //     {
          //       $match: {
          //         user: mongoose.Types.ObjectId(req.params.id),
          //       },
          //     },
          //     { $count: "count" },
          //   ],
        },
      },
      //   {
      //     $project: {
      //       count: { $arrayElemAt: ["$totalCount.count", 0] },
      //       totalData: 1,
      //     },
      //   },
    ]);
    const recoder = data[0].totalData;
    //const total = data[0].count;
    res.json({ success: true, recoder });
  } catch (err) {
    console.log(err);
  }
});
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const data = await Toprecoder.aggregate([
      {
        $facet: {
          totalData: [
            {
              $match: {
                week: mongoose.Types.ObjectId(req.params.id),
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
    res.json({ success: true, recoder, total });
  } catch (err) {
    console.log(err);
  }
});

// router.get("/", verifyToken, async (req, res) => {
//     try {
//       const dashboard = await Toprecoder.find();
//       res.json({ success: true, dashboard: dashboard });
//     } catch (err) {
//       res.status(500).json({ success: false, message: "Internal server error" });
//     }
//   });
module.exports = router;
