// backend/routes/api/users.js
const express = require('express');
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post( '/', validateSignup, async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;

  const duplicateEmail = await User.findOne({
      where: { email }
  });

  const duplicateUsername = await User.findOne({
          where: { username }
  });

  if (duplicateEmail) {
      res.status(403);
      return res.json({
          message: 'User already exists',
          statusCode: 403,
          errors: {
            email: 'User with that email already exists'
              }
      });
  };

  if (duplicateUsername) {
      res.status(403);
      return res.json({
        message: 'User already exists',
        statusCode: 403,
        errors: {
          username: 'User with that username already exists'
        }
      })
  };

  const user = await User.signup({
    firstName,
    lastName,
    email,
    username,
    password
  });

  const token = await setTokenCookie(res, user);
    resUser = user.toJSON();
    resUser.token = token;
    return res.json(resUser);
  }
);

// PHASE 4: Testing in browser console
// fetch('/api/users', {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `Fr253CXs-7FmRIwjGQuSdVpEddTdlNYHLURs`
//     },
//     body: JSON.stringify({
//       email: 'spidey@spider.man',
//       username: 'Spidey',
//       password: 'password'
//     })
//   }).then(res => res.json()).then(data => console.log(data));

module.exports = router;
