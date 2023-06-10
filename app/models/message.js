const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Message = new mongoose.model("Message", MessageSchema);
module.exports = Message;
