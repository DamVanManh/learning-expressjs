const mongoose = require("mongoose");
const transfer = new mongoose.Schema({
  amount: Number,
  accountId: String,
  userId: String,
});
const Transfer = mongoose.model("Transfer", transfer);
module.exports = Transfer;
