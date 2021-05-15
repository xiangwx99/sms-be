const express = require("express");
const AssignExam = require("../models/assignExam.js");
const Students = require("../models/students");

const router = express.Router();

router.post("/assignExam", (req, res) => {
  let { query, tea_id, exam_id, content } = req.body;
  let assignExam = {};
  assignExam.tea_id = tea_id;
  assignExam.exam_id = exam_id;
  assignExam.content = content;
  assignExam.time = query.time;
  Students.find(
    {
      classes: query.classes,
      department: query.department,
      grade: query.grade,
      major: query.major,
    },
    (err, stus) => {
      if (err) {
        return res.status(500).json({
          err_code: 0,
          success: false,
        });
      } else {
        stus.forEach((stu, index) => {
          assignExam.stu_id = stu._id;

          new AssignExam(assignExam).save((err, assignExam) => {
            if (index === stus.length - 1) {
              return res.status(200).json({
                err_code: 1,
                success: true,
                message: "添加成功",
                count: stus.length,
              });
            }
          });
        });
      }
    }
  );
});

router.post("/queryAssignExam", (req, res) => {
  let { query } = req.body;
  AssignExam.find({ stu_id: query }, (err, data) => {
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
      });
    }
  });
});

router.post("/queryAssignExamById", (req, res) => {
  let { _id } = req.body;
  console.log(_id);
  AssignExam.findById(_id, (err, data) => {
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
      });
    }
  });
});

router.post("/updateAssignExamById", (req, res) => {
  let { id, status, content } = req.body;
  console.log(content);
  AssignExam.findByIdAndUpdate(
    id,
    { status: status, content: content },
    (err, data) => {
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
        });
      }
    }
  );
});

module.exports = router;
