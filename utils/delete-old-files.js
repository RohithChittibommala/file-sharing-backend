const File = require("../models/files");
const fs = require("fs");

const deleteOldFiles = async () => {
  const presentDate = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;
  const pastDate = new Date(presentDate - oneDay);
  const files = File.find({ createdAt: { $lt: pastDate } });

  if (files.length === 0) return;

  for (const file of files) {
    fs.unlinkSync(file.path);
    await file
      .remove()
      .catch((er) =>
        console.log(`error occured during ${er.message} ${file.fileName}`)
      );
    console.log(`successfully deleted the file ${file.fileName}`);
  }
};

deleteOldFiles()
  .then((res) => process.exit(0))
  .catch((er) => console.log(er));
