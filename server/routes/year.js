const express = require("express");
const router = express.Router();
const Year = require("../models/Year");
const verifyToken = require("../middleware/auth");

//@route GET api/years
//@desc Get years
//@access Private

router.get("/", verifyToken, async (req, res) => {
  try {
    const years = await Year.find();
    res.json({ success: true, year: years });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//@route POST api/years
//@desc Create year
//@access Private

router.post("/", verifyToken, async (req, res) => {
  const { name } = req.body;

  //Simple validation
  if (!name)
    return res
      .status(400)
      .json({ success: false, message: "Name is required!" });

  try {
    //Check existing name
    const year1 = await Year.findOne({ name });
    if (year1)
      return res.status(400).json({ success: false, message: "Name already" });
    const newYear = new Year({
      name,
    });
    await newYear.save();
    res.json({ success: true, message: "Create successfully", year: newYear });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//@route PUT api/years
//@desc Update year
//@access Private
router.put("/:id", verifyToken, async (req, res) => {
  const { name, isActive } = req.body;
  //Simple validation
  if (!name)
    return res
      .status(400)
      .json({ success: false, message: "Name is required" });
  try {
    let updatedYear = {
      name,
      isActive: isActive || false,
    };
    const yearUpdateCondition = { _id: req.params.id };
    updatedYear = await Year.findOneAndUpdate(
      yearUpdateCondition,
      updatedYear,
      { new: true }
    );
    //Year not found
    if (!updatedYear)
      return res
        .status(401)
        .json({ success: false, message: "Year not found" });
    res.json({
      success: true,
      message: "Excellent progress!",
      year: updatedYear,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//@route DELETE api/years
//@desc Delete year
//@access Private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const yearDeleteCondition = { _id: req.params.id };
    const deleteYear = await Year.findOneAndDelete(yearDeleteCondition);
    if (!deleteYear)
      return res
        .status(401)
        .json({ success: false, message: "Year not found" });
    res.json({ success: true, year: deleteYear });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
module.exports = router;
