const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/my_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const Schema = mongoose.Schema;

const ExamAssignSchema = new Schema({
  tea_id: { type: String, required: true },
  stu_id: { type: String, required: true },
  exam_id: { type: String, required: true },
  status: {
    type: String,
    default: "pending",
  },
  time: { type: Object },
  content: { type: Object },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ExamAssign", ExamAssignSchema);
