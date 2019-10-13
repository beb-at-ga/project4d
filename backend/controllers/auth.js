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

// POST /auth/login (find and validate user and send password)
router.post('/login', (req, res) => {
  // Find the user by their email address
  db.user
    .findOne({
      where: { email: req.body.email },
    })
    .then(user => {
      if (!user || !user.password) {
        // user not found.
        logEvent('auth', 0, `login attmempted for ${req.body.email}`);

        return res.status(406).send({
          message: 'Invalid Credentials',
        });
      }

      if (!user.passwordCheck(req.body.password)) {
        // user found, password did not match
        logEvent('auth', user.id, `bad passweord`);

        return res.status(406).send({
          message: 'Invalid credentials',
        });
      }

      // user found and password successful
      let token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
        expiresIn: 60 * 60,
      });

      logEvent('auth', user.id, `successful login`);
      res.send({ token });
    })
    .catch(err => {
      console.log(err);
      res.status(503).send({
        message: 'Something is amiss.',
      });
    });
});

router.post('/signup', (req, res) => {
  // res.send(req.body);
  db.user
    .findOne({
      where: { email: req.body.email },
    })
    .then(user => {
      // if user exists, do not let them create a duplicate account
      if (user) {
        logEvent('registration', 0, `already registered: ${req.body.email}`);
        return res.status(409).send({
          message: 'Email address already in use.',
        });
      } else {
        db.user
          .create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            agency_id: req.body.agency_id,
            agent_id: req.body.agent_id,
            phonenumber: req.body.phonenumber,
          })
          .then(newUser => {
            // assing user a JWT
            logEvent(
              'registration',
              newUser.id,
              `registration successful: ${req.body.email}`
            );
            let token = jwt.sign(newUser.toJSON(), process.env.JWT_SECRET, {
              expiresIn: 60 * 60, // expiration in seconds.
            });

            logEvent('auth', newUser.id, `successful login`);
            res.send({
              token,
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).send({
              message: 'Error creating new customer record.',
            });
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(503).send({
        message: 'Error accessing database. Please try again.',
      });
    });
});

// router.get('/current/user', (req, res) => {
//   if (!req.user) {
//     res
//       .status(500)
//       .send({ message: 'Something went wrong. Please try again.' });
//   } else {

//     res.send({ user: req.user });
//   }
// });

module.exports = router;
