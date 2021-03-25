const File = require("../models/files");
const router = require("express").Router();

router.get("/:id", async (req, res) => {
  const fileId = req.params.id;
  console.log(fileId);
  const file = await File.findOne({ id: fileId });
  res.json({ file });
});

module.exports.downloadRouter = router;
