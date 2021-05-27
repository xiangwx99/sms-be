const express = require("express");
const studentRouter = require("./routes/student");
const teacherRouter = require("./routes/teacher");
const fileRouter = require("./routes/uploadFiles");
const messageRouter = require("./routes/messages");
const examInfoRouter = require("./routes/examInfo");
const assignExamRouter = require("./routes/assignExam");
const choiceExamRouter = require("./routes/choice");
const mulChoiceExamRouter = require("./routes/mulChoice");
const issueExamRouter = require("./routes/issue");
const completionExamRouter = require("./routes/completion");
const shortAnswerExamRouter = require("./routes/shortAnswer");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const expressWs = require("express-ws");
const Messages = require("./models/messages.js");
//
const app = express();
expressWs(app);
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.ws("/addMessages", function (ws, req) {
  ws.on("message", function (msg) {
    let res = JSON.stringify({ data: msg, success: true });
    new Messages({ content: msg }).save((err, mes) => {
      if (err) {
        let errRes = JSON.stringify({ data: msg, success: false });
        ws.send(errRes);
      } else {
        ws.send(res);
      }
    });
  });
});
app.use((req, res, next) => {
  const url = req.url;
  if (url === "/login" || url === "/loginTea" || url === "/addTeacher") {
    // 请求的借口如果为以上部分则跳过token验证
    next();
  } else {
    const secret = "coderwhh";
    jwt.verify(req.headers.token, secret, (error, decoded) => {
      if (error) {
        return res.status("401").json({
          message: "登录信息已过期, 请重新登陆!",
        });
      } else {
        let effectTime = decoded.exp,
          curTime = Math.floor(Date.now() / 1000);
        if (effectTime < curTime) {
          return res.status("401").json({
            message: "登录信息已过期, 请重新登陆!",
          });
        } else {
          next();
        }
      }
    });
  }
});
app.use(studentRouter);
app.use(teacherRouter);
app.use(fileRouter);
app.use(messageRouter);
app.use(examInfoRouter);
app.use(assignExamRouter);
app.use(choiceExamRouter);
app.use(mulChoiceExamRouter);
app.use(issueExamRouter);
app.use(completionExamRouter);
app.use(shortAnswerExamRouter);

app.listen(8000, function () {
  console.log("running 8000...");
});

module.exports = app;
