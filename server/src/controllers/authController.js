// Import our Database Configuration (allows us to query database)
const { db } = require('../config/db');
const ApiError = require('../utilities/ApiError');
const { findUser, hashPassword, comparePassword, userDetailsToJSON, jwtSignUser } = require('../utilities/authServices');
const debugAuth = require('debug')('app:authcontroller');

module.exports = {
  // GET ALL Users
  async listUsers(req, res, next){
    // Store the document query in variable & call GET method
    const usersRef = db.collection('users');
    const snapshot = await usersRef.get();

    // [400 ERROR] Check for User Asking for Non-Existent Documents
    if (snapshot.empty) {
      return next(ApiError.badRequest('The users you were looking for do not exist'));

    // SUCCESS: Push object properties to array and send to client
    } else {
      let users = [];
      snapshot.forEach(doc => {
        users.push({
          id: doc.id,
          fullName: doc.data().fullName,
          username: doc.data().username,
          email: doc.data().email,
          isAdmin: doc.data().isAdmin
        });
      });
      res.send(users);
    }
  },

  // REGISTER: POST
  async register(req, res, next){
    try {
      // Destructure specific properties for use
      debugAuth(req.body);
      debugAuth(`Status of x-auth-token Header: ${req.headers['x-auth-token']}`);
      const { fullName, username, email, password } = req.body;

      // Validation: Block matching user email
      const userMatch = await findUser(email);
      if( userMatch.length === 1 ){
        return next(ApiError.badRequest('This email is already in use'));
      } 

      // Save new user to database
      // NOTE: If the "add" fails, it will return an error, so we do NOT have to check for a success response
      const usersRef = db.collection('users'); 
      const response = await usersRef.add({
        fullName: fullName,
        username: username,
        email: email,
        password: await hashPassword(password),
        isAdmin: false
      });

      // Confirm Registration & Convert user details to JSON
      console.log(`Success - User: ${response.id} registered!`);
      const userJSON = await userDetailsToJSON(response.id);

      // Return token ONLY
      res.send({
        token: jwtSignUser(userJSON)
      });

    } catch (err) {
      return next(ApiError.internal('Your user profile could not be registered', err));
    }
  },

  // LOGIN: POST
  async login(req, res, next){
    try {
      // Destructure specific properties for use
      debugAuth(req.body);
      debugAuth(`Status of x-auth-token Header: ${req.headers['x-auth-token']}`);
      const { email, password } = req.body; 
      
      // Validation: Block non-matching user email
      const userMatch = await findUser(email);

      if (userMatch.length === 0){
        return next(ApiError.badRequest('The credentials entered are not correct (DEBUG: email)'));
      }

      // Validation: Block non-matching passwords
      const passwordMatch = await comparePassword(userMatch, password);
      if (!passwordMatch) {
        return next(ApiError.badRequest('The credentials entered are not correct (DEBUG: password)')); 
      }

      // Confirm Login & Convert User Details to JSON
      console.log(`Success - User: ${userMatch[0].id} is logged in!`);
      const userJSON = await userDetailsToJSON(userMatch[0].id);

      // Return token ONLY
      res.send({
        token: jwtSignUser(userJSON)
      });

    } catch (err) {
      return next(ApiError.internal('Your user profile cannot be logged into at this time', err));
    }
  }
}