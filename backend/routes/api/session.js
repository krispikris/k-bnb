// backend/routes/api/session.js
const express = require('express');
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const usersRouter = require('./users.js');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation.js');

router.use('./users', usersRouter);

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

// Log in
router.post('/', validateLogin, async (req, res, next) => {
      const { credential, password } = req.body;

      const user = await User.login({ credential, password });

      console.log('THIS IS THE USER: ', user);

      if (!user) {
        res.status(401);
        return res.json({
            message: 'Invalid credentials',
            statusCode: 401
        });

        // const err = new Error('Login failed');
        // err.status = 401;
        // err.title = 'Login failed';
        // err.errors = ['The provided credentials were invalid.'];
        // return next(err);
      }

      let token = await setTokenCookie(res, user);
      let resUser = user.toJSON();
      resUser.token = token;
      return res.json(resUser);
    }
  );

// Log out
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

// Restore session user
router.get('/', restoreUser, (req, res) => {
    const { user } = req;
    if (user) {
      return res.json(user.toSafeObject());
    } else return res.json(null);
  }
);

// FIND router.get (GET CURRENT USER)

// PHASE 4: use to test in browser's DevTools.
// fetch('/api/session', {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `beQSSOBH-ymS8vX_wNz1KVQFRJgKdcUNFMI0`
//     },
//     body: JSON.stringify({ credential: 'Demo-lition', password: 'password' })
//   }).then(res => res.json()).then(data => console.log(data));

// fetch('/api/session', {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
//     },
//     body: JSON.stringify({ credential: 'demo@user.io', password: 'password' })
//   }).then(res => res.json()).then(data => console.log(data));


// fetch('/api/session', {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
//     },
//     body: JSON.stringify({ credential: 'Demo-lition', password: 'Hello World!' })
//   }).then(res => res.json()).then(data => console.log(data));

// fetch('/api/session', {
//   method: 'DELETE',
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN": `GnLE4hDs-QmbDtP1T8bpWffb-eTMDBLUpD-M`
//   }
// }).then(res => res.json()).then(data => console.log(data));

module.exports = router;
