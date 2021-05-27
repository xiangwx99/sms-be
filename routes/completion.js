const express = require("express");
const Completion = require("../models/completion");

const router = express.Router();

router.post("/queryCompletion", (req, res) => {
  Completion.find((err, data) => {
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

router.post("/addCompletion", (req, res) => {
  let { completion } = req.body;
  new Completion(completion).save((err, choice) => {
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

router.post("/deleteCompletion", (req, res) => {
  let _id = req.body._id;
  Completion.remove({ _id: { $in: _id } }, (err, data) => {
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
