const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/sms_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const Schema = mongoose.Schema;

const TeachersSchema = new Schema({
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Teachers", TeachersSchema);
