const express = require("express");
const router = express.Router();
const User = require("../model/User");

router.get("/users", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json("Error in fetching data " + err);
    console.log("Error in fetching data " + err);
  }
});

router.post("/adduser", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
    });
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json("Error in adding user " + err);
  }
});

router.put("/updateuser/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json("User not found");
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json("Error in updating user " + err);
  }
});

router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json("User not found");
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json("Error in deleting user " + err);
  }
});

module.exports = router;
