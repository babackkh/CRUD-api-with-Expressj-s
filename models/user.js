const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const User = mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8, maxlength: 1024 },
});

mongoose.plugin(uniqueValidator);

module.exports = mongoose.model("User", User);


