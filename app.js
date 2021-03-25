require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { fileRouter } = require("./routes/files");
const { downloadRouter } = require("./routes/download");
const cors = require("cors");
const error = require("./middleware/error");

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.set("view engine", "ejs");

app.use("/api", fileRouter);
app.use("/files", downloadRouter);

app.use(error);

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log("app is up and running at http://localhost:4000");
    })
  )
  .catch((er) => console.error(er));
