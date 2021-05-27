const express = require("express");
const MulChoice = require("../models/mulChoice");

const router = express.Router();

router.post("/queryMulChoices", (req, res) => {
  MulChoice.find((err, data) => {
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

router.post("/addMulChoices", (req, res) => {
  let { mulChoice } = req.body;
  new MulChoice(mulChoice).save((err, choice) => {
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

router.post("/deleteMulChoices", (req, res) => {
  let _id = req.body._id;
  MulChoice.remove({ _id: { $in: _id } }, (err, data) => {
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
