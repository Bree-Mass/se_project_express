const express = require("express");
const mongoose = require("mongoose");

const app = express();
const { PORT = 3001 } = process.env;
const routes = require("./routes");

app.use(express.json());
app.use((req, res, next) => {
  req.user = { _id: "66d891ce61cbf6cd2f0cf052" };
  next();
});
app.use(routes);

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
