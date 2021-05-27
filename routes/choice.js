const express = require("express");
const Choices = require("../models/choice");

const router = express.Router();

router.post("/queryChoices", (req, res) => {
  Choices.find((err, data) => {
    if (err) {
      return res.status(500).json({
        err_code: 0,
        success: false,
      });
    } else {
      return res.status(200).json({
        err_code: 1,
        success: true,
        data: data,
        total: data.length,
      });
    }
  });
});

router.post("/addChoices", (req, res) => {
  let { choice } = req.body;
  new Choices(choice).save((err, choice) => {
    if (choice) {
      return res.status(200).json({
        err_code: 1,
        success: true,
      });
    } else {
      return res.status(200).json({
        err_code: 0,
        success: false,
      });
    }
  });
});

router.post("/deleteChoices", (req, res) => {
  let _id = req.body._id;
  Choices.remove({ _id: { $in: _id } }, (err, data) => {
    if (err) {
      return res.status(500).json({
        err_code: 0,
        success: false,
      });
    } else {
      return res.status(200).json({
        err_code: 1,
        success: true,
      });
    }
  });
});

module.exports = router;
