// backend/routes/api/index.js
const router = require('express').Router();

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const spotImagesRouter = require('./spot-images.js');
const reviewsRouter = require('./reviews.js');
const reviewImagesRouter = require('./review-images.js');
const bookingsRouter = require('./bookings.js');
const { restoreUser } = require('../../utils/auth.js');
// const app = require('../../app.js');

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

// being logged in to our router routes
router.use('/session', sessionRouter);
router.use('/users', usersRouter);    // signup route
router.use('/spots', spotsRouter);
router.use('/spot-images', spotImagesRouter);
router.use('/reviews', reviewsRouter);
router.use('/review-images', reviewImagesRouter);
router.use('/bookings', bookingsRouter);

// router.get('/test', requireAuth, (req, res) => {
//   res.json({message: 'success'})
// });

// router.post('/test', function(req, res) {
//   res.json({ requestBody: req.body });
// });

// GET /api/set-token-cookie
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: 'Demo-lition'
//     }
//   });
//   setTokenCookie(res, user);
//   return res.json({ user });
// });

// const { restoreUser } = require("../../utils/auth.js");
// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
//   );

// GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

//NOT SURE IF I NEED BELOW
// // GET /api/restore-user
// router.use(restoreUser);

//   // Connect restoreUser middleware to the API router
//   // If current user session is valid, set req.user to the user in the database
//   // If current user session is not valid, set req.user to null
//   router.use(restoreUser);


module.exports = router;
