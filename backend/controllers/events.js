require('dotenv').config();
const router = require('express').Router();
const db = require('../models');
const jwt = require('jsonwebtoken');

// const logEvent = (type, userid, data) => {
//   db.event
//     .create({
//       type: type,
//       userid: userid,
//       data: data,
//     })
//     .then(event => {
//       console.log('log event created');
//     })
//     .catch(err => {
//       console.log(`failed to write log event to database`);
//       console.log(err);
//     });
// }

router.get('/', (req, res) => {
  db.event.findAll({
    include: [db.user]
  })
  .then(results => {
    res.send(results)
  })
  .catch(err => {
    console.log(`Error accessing database: ${err}`);
    res.send('error');
  })

});

module.exports = router;


