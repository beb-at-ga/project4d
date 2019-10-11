require('dotenv').config();
const router = require('express').Router();
const db = require('../models');
const jwt = require('jsonwebtoken');

const logEvent = (type, userid, data) => {
  db.event
    .create({
      type: type,
      userId: userid,
      data: data,
    })
    .then(event => {
      console.log('log event created');
    })
    .catch(err => {
      console.log(`failed to write log event to database`);
      console.log(err);
    });
};

router.post('/current', (req, res) => {
  db.user
    .findOne({
      where: { id: req.body.id },
    })
    .then(user => {
      if (db.user) {
        db.user.update(req.body, {
          where: {
            id: req.body.id
          }
        })
        .then(() => {
          let token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
            expiresIn: 60 * 60, // expiration in seconds.
          });
          res.send({
            token,
          }); 
        })
        .catch(err => {
          console.log(err);
          res.status(503).send({
            message: 'Error writing to database. Please try again.',
          });
        })
      } else {
        console.log(
          'since this is a protect route, this should never happen...'
        );
      }
    })
    .catch(err => {
      console.log(err);
      res.status(503).send({
        message: 'Error accessing database. Please try again.',
      });
    });
});

router.get('/current', (req, res) => {
  if (!req.user) {
    res
      .status(500)
      .send({ message: 'Something went wrong. Please try again.' });
  } else {
    res.send({ user: req.user });
  }
});

module.exports = router;
