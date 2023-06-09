const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(
    `mongodb+srv://yusuftempr:${encodeURIComponent(
      process.env.ATLAS_ACCOUNT_PASSWORD
    )}@cluster0.t5f8666.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Database connection success!");
  })
  .catch((err) => {
    console.log("Database connection failed!");
    console.log(err);
  });
