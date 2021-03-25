const express = require("express");
const router = express.Router();
const formidable = require("formidable");

const fs = require("fs");
const util = require("util");
const sd = require("silly-datetime");
const path = require("path");
//err_code: 0 : 服务端错误
//err_code: 1 : 成功
//err_code: 2 : 重复
//err_code: 3 : 账号或者密码错误

router.post("/uploadImg", (req, res) => {
  if (!isFormData(req)) {
    res.status(400).json({
      success: false,
      message: "Bad Request",
    });
    return;
  }
  let form = new formidable.IncomingForm();
  form.uploadDir = "/Applications/lx/learn/swpu/sms-be/assets/img";
  // form.keepextensions = true;
  form.parse(req, function (err, fields, files) {
    //使用第三方模块silly-datetime
    var t = sd.format(new Date(), "YYYYMMDDHHmmss");
    //生成随机数
    var ran = parseInt(Math.random() * 8999 + 10000);
    //拿到扩展名
    var extname = path.extname(files.file.name);
    //旧的路径
    var oldpath = files.file.path;
    //新的路径
    var newpath = oldpath + t + ran + extname;
    //改名
    fs.rename(oldpath, newpath, (err) => {
      if (err) {
        return res.status(500).json({
          err_code: 0,
          success: false,
          message: "上传失败",
        });
      }
      return res.status(200).json({
        err_code: 1,
        success: true,
        message: "上传成功",
        avatar: newpath,
      });
    });
  });
});
function isFormData(req) {
  let type = req.headers["content-type"] || "";
  return 0 === type.indexOf("multipart/form-data");
}
module.exports = router;
