const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Budget = new Schema({
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    month: {
      type: Date,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
});
  
module.exports = mongoose.model("Budget", Budget);