const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ id: user._id.toString() }, "SecretKey");

  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};

UserSchema.virtual("messages", {
  ref: "Message",
  localField: "name",
  foreignField: "recipient",
});

const User = new mongoose.model("User", UserSchema);
module.exports = User;
