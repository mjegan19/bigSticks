const { db } = require('../config/db');
const ApiError = require('../utilities/ApiError');
const debugWRITE = require('debug')('app:write');
const debugREAD = require('debug')('app:read');

module.exports = {
  async listGradingTerms(req, res, next) {
    try {
      // Store collection reference & run database query
      const conditionRef = db.collection('cardCondition');
      const snapshot = await conditionRef.get();

      // [400 ERROR] Check for User Asking for Non-Existent Documents
      if (snapshot.empty) {
        return next(ApiError.badRequest('There are currently no conditional grading terms stored in the database'));

        // Successful GET request - Structure the data for client
      } else {
        let docs = [];
        snapshot.forEach(doc => {
          docs.push({
            id: doc.id,
            condition: doc.data().condition,
          });
        });
        res.send(docs);
      }
    } catch (err) {
      return next(ApiError.internal('Conditional grading terms cannot be retrieved at this time', err));
    }    
  },
}