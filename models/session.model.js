const mongoose = require("mongoose");
const sessionsSchema = new mongoose.Schema({
  cart: Object,
});
const Session = mongoose.model("Sessions", sessionsSchema);
module.exports = Session;
