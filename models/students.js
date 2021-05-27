const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/sms_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const Schema = mongoose.Schema;

const StudentsSchema = new Schema({
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  department: { type: String, require: true },
  gender: { type: String, require: true },
  major: { type: String, require: true },
  classes: { type: String, require: true },
  grade: { type: String, require: true },
  name: { type: String, require: true },
  nation: { type: String },
  age: { type: Number },
  idcard: { type: String },
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Students", StudentsSchema);
