const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const itemRoutes = require("./routes/items");
const userRoutes = require("./routes/users");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established");
});

app.use(cors());
app.use(express.json());
app.use("/api/items", itemRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
