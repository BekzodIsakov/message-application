const express = require("express");
const cors = require("cors");

const User = require("../models/user");
const authWithToken = require("../middleware/authWithToken");
const Message = require("../models/message");
require("./mongoose");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) {
      const user = new User(req.body);
      const token = await user.generateAuthToken();
      const userObjet = user.toObject();
      delete userObjet.tokens;
      res.status(201).send({ user: userObjet, token });
    } else {
      const token = await user.generateAuthToken();
      const userObjet = user.toObject();
      delete userObjet.tokens;
      res.send({ user: userObjet, token });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/signout", authWithToken, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    req.res.send();
  } catch (error) {
    res.status(500).send();
  }
});

app.get("/users", authWithToken, async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) return res.status(404).send({ message: "Not found!" });
    res.send(users);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/message", authWithToken, async (req, res) => {
  const message = new Message({
    ...req.body,
  });
  try {
    await message.save();
    console.log({ message });
    res.send(message);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/messages", authWithToken, async (req, res) => {
  try {
    await req.user.populate("messages");
    res.send(req.user.messages);
  } catch (error) {
    res.status(500).send(error);
  }
});

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log("Server is live on port: " + port);
});
