import express from "express";
import mongoose from "mongoose";
const PORT = process.env.PORT || 4000;

const app = express();

app.get("/", (req, res) => {
  res.send(`<h2> this is working </h2>`);
});

app.get("/:id", (req, res) => {
  console.log(req.params);
  res.json({ id: req.params.id });
});

const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("Database connected 🥳🥳🥳🥳");
  })
  .catch((err) => {
    console.log("Connection failed ☹️☹️☹️☹️");
  });
app.listen(PORT, () => console.log("app is up and running"));
