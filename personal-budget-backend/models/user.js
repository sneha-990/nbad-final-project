const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const User = new Schema({
  firstname: {
    type: String,
    default: "",
  },
  lastname: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    default: "",
  },
  admin: {
    type: Boolean,
    default: false,
  },
  budget: [
    {
      type: Schema.Types.ObjectId,
      ref: "Budget",
    },
  ],
  expense: [
    {
      type: Schema.Types.ObjectId,
      ref: "Expense",
    },
  ],
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);