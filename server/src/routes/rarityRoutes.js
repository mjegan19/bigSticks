const express = require('express');
const router = express.Router();

const RarityController = require('../controllers/rarityController');

module.exports = () => {
  router.get('/terms',
  RarityController.listRarityTerms
  );

  return router;
}