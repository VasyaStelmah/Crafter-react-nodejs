const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const userRoutes = require("./routes/user");
const recipesRotes = require("./routes/recipes");
const subjectsRotes = require("./routes/subjects");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .catch((error) => {
    console.log(error);
  });
app.use("/user", userRoutes);
app.use("/recipes", recipesRotes);
app.use("/subjects", subjectsRotes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port : ${process.env.PORT}`);
});
