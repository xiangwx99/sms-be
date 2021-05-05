const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/my_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const Schema = mongoose.Schema;

const ExamSchema = new Schema({
  tea_id: { type: String, required: true },
  content: { type: Object },
  // type: { type: String },
  // score: { type: String },
  // options: { type: Array },
  // question: { type: String },
  // questionHtml: { type: String },
  // answer: { type: String },
  // answerdDetail: { type: String },
  // answerdDetailHTML: { type: String },
  // replyScore: { type: String },
  // replyAnswer: { type: String },
  // replyAnswerHtml: { type: String },
  // createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Exam", ExamSchema);
