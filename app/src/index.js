const express = require("express");
const User = require("../models/user");
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

// app.post("/signup", async (req, res) => {
//   try {
//     const user = new User(req.body);
//     const token = await user.generateAuthToken();
//     const userObjet = user.toObject();
//     delete userObjet.tokens;
//     res.status(201).send({ user: userObjet, token });
//   } catch (error) {
//     res.status(400).send();
//   }
// });

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log("Server is live on port: " + port);
});
