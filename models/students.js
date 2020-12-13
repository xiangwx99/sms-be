const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const Schema = mongoose.Schema

const StudentsSchema = new Schema({
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: {  type: Date, default: Date.now }
})

module.exports = mongoose.model('Students', StudentsSchema)