const functions = require('firebase-functions');
console.log('init');

/**
 * Module dependencies.
 */

const app = require('./app');
console.log('app requred done')
/**
 * Get port from environment and store in Express.
 */

const expressInstance = functions.https.onRequest(app);
console.log('app passed to http handler');

module.exports = {
  expressInstance
};