const express = require("express");
const User = require("../models/user");
const authWithToken = require("../middleware/authWithToken");
require("./mongoose");

const app = express();
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

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log("Server is live on port: " + port);
});
