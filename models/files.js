const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    size: { type: Number, required: true },
    id: { type: String, required: true },
    path: { type: String, required: true },
  },
  { timestamps: true }
);

const File = mongoose.model("files", fileSchema);

module.exports = File;
