const express = require("express");
const multer = require("multer");
const path = require("path");
const { nanoid } = require("nanoid");
const File = require("../models/files");
const { asyncMiddleware } = require("../utils/async-middleware");

const app = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, "uploads/"),
  filename: (req, file, callback) => {
    const uniqueFileName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    console.log(uniqueFileName);
    callback(null, uniqueFileName);
  },
});

const upload = multer({ storage, limits: { fileSize: 1_000_000 * 25 } }).single(
  "my-file"
);

app.post(
  "/files",
  asyncMiddleware((req, res) => {
    upload(req, res, async (err) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!req.file) return res.json({ error: "file is required" });
      const file = new File({
        fileName: req.file.filename,
        size: req.file.size,
        id: nanoid(),
        path: req.file.path,
      });
      const response = await file.save();
      console.log(response);
      res.json({ file: `${process.env.APP_BASE_URL}/files/${response.id}` });
    });
  })
);

app.get(
  "/files",
  asyncMiddleware((req, res) => {
    return res.json();
  })
);

module.exports.fileRouter = app;

//
