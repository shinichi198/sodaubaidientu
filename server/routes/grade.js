const express = require("express");
const router = express.Router();
const Grade = require("../models/Grade");

const verifyToken = require("../middleware/auth");

//@route POST api/grades
//@desc Create Grade
//@access Private
router.post("/", verifyToken, async (req, res) => {
  const { name } = req.body;
  if (!name)
    return res
      .status(400)
      .json({ success: false, message: "Name is required!" });
  try {
    const grade1 = await Grade.findOne({ name });
    if (grade1)
      return res
        .status(400)
        .json({ success: false, message: "Name is already" });
    const newGrade = new Grade({
      name,
    });
    await newGrade.save();
    res.json({ success: true, grade: newGrade });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//@route GET api/grades
//@desc get Grades
//@access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const grades = await Grade.find();
    res.json({ success: true, grade: grades });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
module.exports = router;
