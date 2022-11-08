const express = require('express');
const router = express.Router();

const CardPolicy = require('../policies/cardPolicy');
const FilePolicy = require('../policies/filePolicy');
const fileServerUpload = require('../middleware/fileServerUpload');
const CardController = require('../controllers/cardController');


module.exports = () => {
  // GET ALL ROUTE
  router.get('/',
    CardController.getCard
  );

  // POST ROUTE
  router.post('/',
    [CardPolicy.validateCard,
    FilePolicy.filesPayloadExists,
    FilePolicy.fileSizeLimiter,
    FilePolicy.fileExtLimiter(['.png', '.jpg', '.jpeg', '.gif']),
    fileServerUpload],
    CardController.postCard
  );

  // GET BY ID
  router.get('/:id',
      CardController.getCardById
  );

  // UPDATE/PUT ROUTE BY ID Route
  router.put('/:id',
    [CardPolicy.validateCard,
    FilePolicy.filesPayloadExists,
    FilePolicy.fileSizeLimiter,
    FilePolicy.fileExtLimiter(['.png', '.jpg', '.jpeg', '.gif']),
    fileServerUpload],
    CardController.putCardById
  );
  

  // DELETE BY ID Route
  router.delete('/:id',
    CardController.deleteCardById
  )

  return router;
}