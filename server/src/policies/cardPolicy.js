// Import Joi Validation module
const Joi = require('joi');
const ApiError = require('../utilities/ApiError');
const debugJoi = require('debug')('app:joi');

module.exports = {
  // [1] POST Validation
  validateCard(req, res, next){
    debugJoi(req.body);
    const schema = Joi.object({
      year: Joi.string().min(4).max(4).required(),
      manufacturer: Joi.string().min(3).max(15).required(),
      playerName: Joi.string().min(3).max(50).required(),
      teamName: Joi.string().min(3).max(50).required(),
      competition: Joi.string().min(3).max(6).required(),
      cardNo: Joi.string().pattern(new RegExp('^[0-9]{1,3}$')),
      setTotal: Joi.string().pattern(new RegExp('^[0-9]{1,3}$')),
      description: Joi.string().min(3).max(4000).required(),
      condition: Joi.string().min(3).max(12).required(),
      rarity: Joi.string().min(3).max(12).required(),
      value:  Joi.number().required(),
      image: Joi.any(),
      uploadedFile: Joi.string()
    });

    // Return one of two values
    const { error, value } = schema.validate(req.body);

    // ON VALIDATION ERROR: We call Error Middleware & Pass Bad Request with Dynamic Validation Error Message
    if ( error ) {
      debugJoi(error);
      switch(error.details[0].context.key){
        case 'year':
          next(ApiError.badRequest('You must provide a valid year of card\'s release'))
          break

        case 'symbol':
          next(ApiError.badRequest('You must provide a 3 letter symbol for the CBDC'))
          break

        case 'value':
          next(ApiError.badRequest('You must provide valid card price information'))
          break

        case 'cardNo':
        case 'setTotal':
          next(ApiError.badRequest('You must provide card numbers as per card(s) in collection'))
          break

        case 'playerName':
        case 'teamName':
        case 'competition':
        case 'description':
          next(ApiError.badRequest('You must provide valid information about the trading card'))
          break

        case 'image':
        case 'uploadedFile':
          next(ApiError.badRequest('You must provide a valid image'))
          break

        default: 
          next(ApiError.badRequest('Invalid Form Information - please check form information and try again'))
      }

    // ON SUCCSSS: We pass to next middleware
    } else {
      next();
    }
  }
  
}