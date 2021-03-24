const express = require("express");
const Teachers = require("../models/teachers");
const jwt = require("jsonwebtoken");
//err_code: 0 : 服务端错误
//err_code: 1 : 成功
//err_code: 2 : 重复
//err_code: 3 : 账号或者密码错误

const router = express.Router();

router.post("/loginTea", (req, res) => {
  let body = req.body;
  Teachers.findOne(
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
          });
        }
      );
    }
  );
});

router.post("/addTeacher", (req, res) => {
  let body = req.body;
  Teachers.findOne({ phoneNumber: body.phoneNumber }, (err, data) => {
    if (err) {
      return res.status(500).json({
        err_code: 0,
        success: false,
        message: "服务端错误",
      });
    }
    if (data) {
      return res.status(200).json({
        err_code: 2,
        success: false,
        message: "账号已存在, 请重试",
      });
    }
    new Teachers(body).save((err, teacher) => {
      if (err) {
        return res.status(500).json({
          err_code: 0,
          message: "数据库插入失败",
        });
      }
      res.status(200).json({
        err_code: 1,
        success: true,
        message: "add teacher success",
      });
    });
  });
});

router.get("/downTemplate", (req, res) => {
  return res.status(200).json({
    err_code: 0,
    fileUrl: "http://127.0.0.1/assets/excel/swpu-template.xls",
    status: true,
  });
});

module.exports = router;
