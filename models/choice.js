const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/sms_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const Schema = mongoose.Schema;

const ChoiceSchema = new Schema({
  type: { type: String },
  score: { type: String },
  question: { type: String },
  questionHtml: { type: String },
  options: { type: Array },
  answer: { type: String },
  answerdDetail: { type: String },
  answerdDetailHTML: { type: String },
  replyScore: { type: String },
  replyAnswer: { type: String },
  replyAnswerHtml: { type: String },
});

module.exports = mongoose.model("Choice", ChoiceSchema);
