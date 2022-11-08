const { bucket } = require('../config/db');
const fs = require('fs');
const uuid = require('uuid');
const debugBucket = require('debug')('app:bucket');
const config = require('../config/config');

module.exports = {
  async storageBucketUpload(filename) {
    // 1. Generate random UUID storage token
    debugBucket(`Firestore File Name: ${filename}`);
    const storageToken = uuid.v4();

    // 2. Declare filepath & options parameter variables for upload
    const serverFilePath = `./public/uploads/${filename}`;
    const options = {
      destination: filename,
      resumable: true,
      validation: 'crc32c',
      metadata: {
        metadata: {
          firebaseStorageDownloadTokens: storageToken
        }
      }
    };

    // 3. Cloud Firestore Upload Method Call
    const result = await bucket.upload(serverFilePath, options);
    const bucketName = result[0].metadata.bucket;

    // 4. Construct Download URL
    const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${filename}?alt=media&token=${storageToken}`;
    console.log(`File successfully uploaded to Storage: ${downloadURL}`);

    // 5. Delete temporary file in server-side uploads
    fs.unlink(serverFilePath, err=> {
      if(err) {
        debugBucket(err);
        return({
          message: "Error occurred in removing file from temporary local storage"
        });
      } else {
        debugBucket('File in temporary local storage deleted');
      }
    });
    return downloadURL;
  },

  async deleteFileFromBucket(uploadedFile) {
    // 1. Determine & Store File Location
    const file = bucket.file(uploadedFile);

    // 2. Check file for deletion existing
    const fileChecker = await file.exists();
    if(fileChecker[0] === false) {
      // Toggle - True = ignores missing file | False = triggers error on missing file
      const options = {
        ignoreNotFound: true,
      }

      // Issue delete request based on toggle value
      const data = await file.delete(options);
      debugBucket(`The file: ${uploadedFile}, does not exist in storage. Please check server for inconsistent data handling queries`);

      return data[0];

    } else {
      // 3. Successful Delete Request - Image Exists
      const data = await file.delete();
      console.log(`File deleted from Storage Bucket: ${uploadedFile}`);
      return data[0];
    }
  },

  getFileFromUrl(downloadURL) {
    const baseURL = `https://firebasestorage.googleapis.com/v0/b/${config.db.storageBucket}/o/`;
    console.log(baseURL);
  
    // (i) Remove baseURL from downloadURL
    let fileGlob = downloadURL.replace(baseURL, "");
  
    // (ii) Remove everything after "?"
    const indexOfEndPath = fileGlob.indexOf("?");
    fileGlob = fileGlob.substring(0, indexOfEndPath);
  
    // Return existing uploaded file
    console.log(`Generated File Glob: ${fileGlob}`);
    return fileGlob;
  }
}