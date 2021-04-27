const express = require("express");
const Students = require("../models/students");
const jwt = require("jsonwebtoken");
//err_code: 0 : 服务端错误
//err_code: 1 : 成功
//err_code: 2 : 重复
//err_code: 3 : 账号或者密码错误

const router = express.Router();

router.post("/login", (req, res) => {
  let body = req.body;
  Students.findOne(
    {
      phoneNumber: body.phoneNumber,
      password: body.password,
    },
    (err, data) => {
      if (err) {
        return res.status(500).json({
          err_code: 0,
          message: err.message,
        });
      }
      if (!data) {
        return res.status(200).json({
          err_code: 3,
          message: "账号或者密码错误",
        });
      }
      /** 生成token并且返回 **/
      const secret = "coderwhh";
      jwt.sign(
        {
          name: body.phoneNumber,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
        },
        secret,
        (err, token) => {
          res.status(200).json({
            err_code: 1,
            success: true,
            message: "登录成功",
            token: token,
            userInfo: data,
          });
        }
      );
    }
  );
});

router.post("/addStudent", (req, res) => {
  let { stuInfo } = req.body;
  let phoneArr = [];
  stuInfo.forEach((stu) => phoneArr.push(stu.phoneNumber));
  Students.find({ phoneNumber: { $in: phoneArr } }, (err, data) => {
    if (data.length > 0) {
      return res.status(200).json({
        err_code: 2,
        success: false,
        message: `包含已有账号, 请检查后重试一试`,
      });
    } else if (data.length === 0) {
      stuInfo.forEach((stu, index) => {
        new Students(stu).save((err, student) => {
          if (index === stuInfo.length - 1) {
            return res.status(200).json({
              err_code: 2,
              success: true,
              message: `成功插入数据${index + 1}条`,
            });
          }
        });
      });
    }
  });
});

router.post("/queryStudent", (req, res) => {
  let { page, size, grade, classes, phoneNumber } = { ...req.body.queryArgs };
  let args = {};
  grade.length > 0 && (args.grade = { $in: grade });
  classes.length > 0 && (args.classes = { $in: classes });
  phoneNumber && (args.phoneNumber = phoneNumber);

  Students.find(args, (err, data) => {
    if (err) {
      return res.status(500).json({
        err_code: 0,
        success: false,
      });
    } else {
      let dataCopy = [].concat(data);
      return res.status(200).json({
        err_code: 1,
        success: true,
        data: dataCopy.splice(size * (page - 1), size),
        total: data.length,
      });
    }
  });
});

router.post("/queryStudentById", (req, res) => {
  let { _id } = { ...req.body };
  Students.findOne({ _id: _id }, (err, data) => {
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

router.post("/deleteStudent", (req, res) => {
  let _id = req.body.id;
  Students.remove({ _id: _id }, (err, data) => {
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

router.post("/updateStudentInfo", (req, res) => {
  let { stuInfo } = req.body;
  let { name, age, idcard, nation, gender, avatar } = stuInfo;

  Students.findByIdAndUpdate(
    stuInfo._id,
    {
      name: name,
      age: age,
      idcard: idcard,
      nation: nation,
      gender: gender,
      avatar: avatar ? avatar : null,
    },
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
        });
      }
    }
  );
});

router.post("/resetStudentPassword", (req, res) => {
  let { _id, oldpassword, newpassword } = req.body;
  Students.findOneAndUpdate(
    {
      _id: _id,
      password: oldpassword,
    },
    {
      password: newpassword,
    },
    (err, data) => {
      if (err) {
        return res.status(500).json({
          err_code: 0,
          success: false,
        });
      } else {
        if (data) {
          return res.status(200).json({
            err_code: 1,
            success: true,
          });
        } else {
          return res.status(200).json({
            err_code: 1,
            success: false,
            message: "旧密码错误",
          });
        }
      }
    }
  );
});

module.exports = router;