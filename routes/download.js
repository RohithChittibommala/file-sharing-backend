const File = require("../models/files");
const router = require("express").Router();
const { asyncMiddleware } = require("../middleware/async-middleware");

router.get(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const fileId = req.params.id;
    const file = await File.findOne({ id: fileId });
    res.json(file);
  })
);

router.get(
  "/download/:id",
  asyncMiddleware(async (req, res) => {
    const fileId = req.params.id;

    const file = await File.findOne({ id: fileId });
    console.log(file);
    const filePath = `${__dirname}/../${file.path}`;

    console.log(filePath);
    res.download(filePath);
  })
);
module.exports.downloadRouter = router;
