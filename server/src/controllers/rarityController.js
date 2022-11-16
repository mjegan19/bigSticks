const { db } = require('../config/db');
const ApiError = require('../utilities/ApiError');
const debugWRITE = require('debug')('app:write');
const debugREAD = require('debug')('app:read');

module.exports = {
  async listRarityTerms(req, res, next) {
    try {
      // Store collection reference & run database query
      const rarityRef = db.collection('cardRarity');
      const snapshot = await rarityRef.orderBy('key', 'desc').get();

      // [400 ERROR] Check for User Asking for Non-Existent Documents
      if (snapshot.empty) {
        return next(ApiError.badRequest('There are currently no rarity terms stored in the database'));

        // Successful GET request - Structure the data for client
      } else {
        let docs = [];
        snapshot.forEach(doc => {
          docs.push({
            id: doc.id,
            key: doc.data().key,
            rarity: doc.data().rarity,
          });
        });
        res.send(docs);
      }
    } catch (err) {
      return next(ApiError.internal('Rarity terms cannot be retrieved at this time', err));
    }    
  },
}