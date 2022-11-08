const express = require('express');
const router = express.Router();

const ConditionController = require('../controllers/conditionController');

module.exports = () => {
  router.get('/terms',
  ConditionController.listGradingTerms
  );

  return router;
}