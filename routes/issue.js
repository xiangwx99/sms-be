const express = require("express");
const Issue = require("../models/issue");

const router = express.Router();

router.post("/queryIssue", (req, res) => {
  Issue.find((err, data) => {
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

router.post("/addIssue", (req, res) => {
  let { issue } = req.body;
  new Issue(issue).save((err, choice) => {
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

router.post("/deleteIssue", (req, res) => {
  let _id = req.body._id;
  Issue.remove({ _id: { $in: _id } }, (err, data) => {
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
