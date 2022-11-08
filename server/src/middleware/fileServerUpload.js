const ApiError = require("../utilities/ApiError");
const path = require("path");
const { request } = require("http");
const debugFILE = require('debug')('app:file');

const fileServerUpload = (req, res, next) => {
  if(req.files) {
    // 1. Store File
    const file = req.files.image;
    debugFILE(`Image for Server Processing: ${file.name}`);

    // 2. Append unique filename extension
    const filename = Date.now() + '_' + file.name;
    debugFILE(`Unique Filename: ${filename}`);

    // 3.Declare server storage directory path (where are we going to be storing the file)
    const uploadPath = path.join(
      __dirname,
      '../../public/uploads',
      filename
    );

    // 4. Move file to server storage
    file
    .mv(uploadPath)
    .then(() => {
      // Store unique filename in res.locals object & pass to next middleware
      console.log(`Server Upload Successful: ${uploadPath}`);
      res.locals.filename = filename;
      next();
    })
    .catch(err => {
      if (err) return next(ApiError.internal('Your file request could not be processed at this time', err));
    });
  } else {
    next();
  }
}

module.exports = fileServerUpload;