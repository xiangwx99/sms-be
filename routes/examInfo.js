const express = require("express");
const ExamInfo = require("../models/examInfo.js");

const router = express.Router();

router.post("/addExam", (req, res) => {
  let content = req.body;

  new ExamInfo(content).save((err, exam) => {
    if (err) {
      res.status(200).json({
        err_code: 0,
        success: false,
        message: "添加失败",
      });
    } else {
      res.status(200).json({
        err_code: 1,
        success: true,
        message: "添加成功",
      });
    }
  });
});

router.post("/queryExam", (req, res) => {
  let content = req.body;

  ExamInfo.find(content, (err, exam) => {
    if (err) {
      res.status(200).json({
        err_code: 0,
        success: false,
        message: "查询失败",
      });
    } else {
      res.status(200).json({
        err_code: 1,
        success: true,
        data: exam,
      });
    }
  });
});

router.post("/deleteExam", (req, res) => {
  let content = req.body;

  ExamInfo.remove(content, (err, exam) => {
    if (err) {
      res.status(200).json({
        err_code: 0,
        success: false,
        message: "删除失败",
      });
    } else {
      res.status(200).json({
        err_code: 1,
        success: true,
        data: exam,
      });
    }
  });
});

router.post("/queryExamById", (req, res) => {
  let content = req.body;

  ExamInfo.findOne(content, (err, exam) => {
    if (err) {
      res.status(200).json({
        err_code: 0,
        success: false,
        message: "查询失败",
      });
    } else {
      res.status(200).json({
        err_code: 1,
        success: true,
        data: exam,
      });
    }
  });
});
module.exports = router;
