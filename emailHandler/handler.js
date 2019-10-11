'use strict';

const options = {
  myEmail: process.env.EMAIL, 
  myDomain: process.env.DOMAIN  //for cors, domain name or '*' for any domain
}
 
const { sendJSON, sendFormEncoded } = require('./lambdaMailerCorreto')(options)
 
// Content-Type: application/x-www-form-urlencoded
// The event.body needs to a URI encoded string with 3 parameters
// - email
// - name
// - content
// - subject
module.exports.sendFormEncoded = sendFormEncoded

