const fs = require('fs-extra');
const { PORT } = require('./../config');

const postImage = (req, res) => {
  let fileStream;
  req.pipe(req.busboy);
  req.busboy.on('file', (fieldname, file, filename) => {
    console.log('Uploading file: ', filename);

    fileStream = fs.createWriteStream(__basedir + '/images/' + filename);
    file.pipe(fileStream);
    fileStream.on('close', () => {
      console.log('Upload Finished: ', filename);
      res
        .status(201)
        .send(`http://localhost:${PORT}/get-image/${filename}`)
    })
  })
}

module.exports = postImage;