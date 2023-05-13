// server.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const client = new MongoClient("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  console.log("MongoDB database connection established successfully");
});

const collection = client.db("LoginApp").collection("User");

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await collection.findOne({ username });
  if (!user) {
    return res.status(401).json({ error: "Invalid user credentials" });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(401).json({ error: "Invalid password credentials" });
  }
  try {
    const token = jwt.sign({ username }, process.env.jwtSecret);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
