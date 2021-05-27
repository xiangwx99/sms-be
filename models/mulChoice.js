const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/sms_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const Schema = mongoose.Schema;

const MulChoiceSchema = new Schema({
  type: { type: String },
  score: { type: String },
  question: { type: String },
  questionHtml: { type: String },
  options: { type: Array },
  answer: { type: Array },
  answerdDetail: { type: String },
  answerdDetailHTML: { type: String },
  replyScore: { type: String },
  replyAnswer: { type: Array },
  replyAnswerHtml: { type: String },
});

module.exports = mongoose.model("MulChoiceSchema", MulChoiceSchema);
