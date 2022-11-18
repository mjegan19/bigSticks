const { db } = require('../config/db');
const ApiError = require('../utilities/ApiError');
const { storageBucketUpload, deleteFileFromBucket, getFileFromUrl } = require('../utilities/bucketServices');
const debugWRITE = require('debug')('app:write');
const debugREAD = require('debug')('app:read');

module.exports = {
  // GET ALL ROUTE
  async getCard(req, res, next) {
    try {
      // Store collection reference & run database query
      const cardRef = db.collection('cardInfo');
      const snapshot = await cardRef
        .orderBy('playerName', 'asc' )
        .orderBy('rarity', 'desc')
        .get();

      // [400 ERROR] Check for User Asking for Non-Existent Documents
      if (snapshot.empty) {
        return next(ApiError.badRequest('There are currently no cards stored in the database'));

        // Successful GET request - Structure the data for client
      } else {
        let docs = [];
        snapshot.forEach(doc => {
          docs.push({
            id: doc.id,
            year: doc.data().year,
            manufacturer: doc.data().manufacturer,
            playerName: doc.data().playerName,
            teamName: doc.data().teamName,
            competition: doc.data().competition,
            cardNo: doc.data().cardNo,
            setTotal: doc.data().setTotal,
            description: doc.data().description,
            condition: doc.data().condition,
            rarity: doc.data().rarity,
            value: doc.data().value,
            image: doc.data().image,
          });
        });
        res.send(docs);
      }
    } catch (err) {
      return next(ApiError.internal('Trading cards cannot be retrieved at this time', err));
    }    
  },

  // POST ROUTE
  async postCard(req, res, next) {
    // Testing data posted to server
    debugWRITE(req.body);
    debugWRITE(req.files);
    debugWRITE(res.locals);
    
    let downloadURL = null;
    try {

      const filename = res.locals.filename;
      downloadURL = await storageBucketUpload(filename);

    } catch (err) {
      return next(ApiError.internal('An error occurred in uploading the image to storage', err));
    }

    try {
      const cardRef = db.collection('cardInfo');
      const response = await cardRef.add({
        year: req.body.year,
        manufacturer: req.body.manufacturer,
        playerName: req.body.playerName,
        teamName: req.body.teamName,
        competition: req.body.competition,
        cardNo: Number(req.body.cardNo),
        setTotal: Number(req.body.setTotal),
        description: req.body.description,
        condition: req.body.condition,
        rarity: req.body.rarity,
        value: req.body.value,
        image: downloadURL,
      });
      console.log(`Added new card with ID: ${response.id}`);
      res.send(response.id);
    } catch (err) {
      return next(ApiError.internal('Your request could not be saved at this time', err));
    }
  },

  // GET BY ID
  async getCardById(req, res, next) {
    debugREAD(req.params);

    try {
      const cardRef = db.collection('cardInfo').doc(req.params.id);
      const doc = await cardRef.get();

      // [400 ERROR]  Check for User Asking for Non-Existent Documents
      if (!doc.exists) {
        return next(ApiError.badRequest('The trading card you were looking for does not exist'));
      
      } else {
        res.send(doc.data());
      }

    } catch (err) {
      return next(ApiError.internal('Your request could not be saved at this time', err));
    }
  },

  // UPDATE/PUT ROUTE
  async putCardById(req, res, next) {
    debugWRITE(req.params);
    debugWRITE(req.body);
    debugWRITE(req.files);
    debugWRITE(res.locals);

    let downloadURL;

    try {
      if (req.files) {
        // (i) Standard Cloud Storage Upload
        const filename = res.locals.filename;
        downloadURL = await storageBucketUpload(filename);

        // (ii) New - Delete OLD image version in Storage (if it exists!)
        if (req.body.uploadedFile) {
          debugWRITE(`Deleting OLD image in storage: ${req.body.uploadedFile}`);
          const bucketResponse = await deleteFileFromBucket(req.body.uploadedFile);
        }

      } else if (req.body.image) {
        console.log("No change to image in DB");
        downloadURL = req.body.image;
      } else {
        return next(ApiError.badRequest('The file you are trying to upload cannot be edited!'));
      }
    } catch (err) {
      return next(ApiError.internal('An error occurred in uploading the image to storage', err));
    }

    try {
      const cardRef = db.collection('cardInfo').doc(req.params.id);
      const response = await cardRef.update({
        year: req.body.year,
        manufacturer: req.body.manufacturer,
        playerName: req.body.playerName,
        teamName: req.body.teamName,
        competition: req.body.competition,
        cardNo: Number(req.body.cardNo),
        setTotal: Number(req.body.setTotal),
        description: req.body.description,
        condition: req.body.condition,
        rarity: req.body.rarity,
        value: req.body.value,
        image: downloadURL,
      });
      res.send(response);
    } catch (err) {
      return next(ApiError.internal('Your request could not be saved at this time', err));
    }
  },

  // DELETE ROUTE
  async deleteCardById(req, res, next) {
    debugWRITE(req.params);

    try {
      // (i) Obtain the document to be deleted
      const cardRef = db.collection('cardInfo').doc(req.params.id);
      const doc = await cardRef.get();

      // 400 ERROR: Doc ID exists
      if(!doc.exists) {
        return next(ApiError.badRequest('The trading card you were looking for does not exist'));
      }

      // (ii) Delete the uploaded file in cloud storage
      const downloadURL = doc.data().image;
      const uploadedFile = getFileFromUrl(downloadURL);
      const bucketResponse = await deleteFileFromBucket(uploadedFile);

      // (iii) Delete document from Cloud Firestore
      if(bucketResponse) {
        const response = await cardRef.delete({ exists: true });
        res.send(response);
      }

    } catch (err) {
      return next(ApiError.internal('Your request could not be queried at this time', err));
    }
  }
}