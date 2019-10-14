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
        db.user
          .update(req.body, {
            where: {
              id: req.body.id,
            },
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
          });
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
    // console.log(req.user);
    db.user
      .findOne({
        where: { email: req.user.email },
      })
      .then(user => {
        res.send({user: user})
      })
      .catch(err => {
        console.log(err);
      });
  }
});

router.get('/all', (req, res) => {
  if (!req.user) {
    res
      .status(500)
      .send({ message: 'Something went wrong. Please try again.' });
  } else {
    if (req.user.isAdmin) {
      // find the user the submitted the request and confirm if isAdmin...
      db.user
      .findOne({
        where: { email: req.user.email },
      })
      .then(user => {
        if (user.isAdmin) {
          db.user
          .findAll()
          .then(allUsers => {
              res.send(allUsers)
          })
          .catch(err => {
            console.log(err)
            res.send('Error reading database.')
          })
        } else {
          // req.user said they were isAdmin, but the database differs... bug or hack attempt?
          res.send('unauthorized')
        }
      })
      .catch(err => {
        console.log(err);
      });

    } else {
      res.send('unauthorized')
    }
  }

})

module.exports = router;
