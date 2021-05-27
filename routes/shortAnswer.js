const express = require("express");
const ShortAnswer = require("../models/shortAnswer");

const router = express.Router();

router.post("/queryShortAnswer", (req, res) => {
  ShortAnswer.find((err, data) => {
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

router.post("/addShortAnswer", (req, res) => {
  let { shortAnswer } = req.body;
  new ShortAnswer(shortAnswer).save((err, choice) => {
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

router.post("/deleteShortAnswer", (req, res) => {
  let _id = req.body._id;
  ShortAnswer.remove({ _id: { $in: _id } }, (err, data) => {
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
