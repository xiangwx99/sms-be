const express = require("express");
const Messages = require("../models/messages.js");

const router = express.Router();

router.post("/addMessages", (req, res) => {
  let content = req.body;
  new Messages(content).save((err, student) => {
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

router.post("/queryMessages", (req, res) => {
  let { page, size } = { ...req.body };

  Messages.find((err, data) => {
    if (err) {
      return res.status(500).json({
        err_code: 0,
        success: false,
      });
    } else {
      let dataCopy = [].concat(data).reverse();
      return res.status(200).json({
        err_code: 1,
        success: true,
        data: dataCopy.splice(size * (page - 1), size),
        total: data.length,
      });
    }
  });
});

module.exports = router;
