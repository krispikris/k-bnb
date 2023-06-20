const express = require('express');
const router = express.Router();

const { User, Spot, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

// #11: GET ALL SPOTS OWNED BY THE CURRENT USER
router.get('/current', requireAuth, async (req, res) => {
    const ownerId = req.user.id;
    const spots = await Spot.findAll({
        where: { ownerId : ownerId }
    });

    let result = [];
    for (let spot of spots) {
        spot = spot.toJSON();

        const ratings = await Review.findAll({
            where: { spotId : spot.id },
            attributes: [[ sequelize.fn('AVG', sequelize.col('stars')), 'avgRating' ]]
        });

        spot.avgRating = Number(ratings[0].toJSON().avgRating);

        const imageURL = await SpotImage.findOne({
            where: { spotId : spot.id, preview : true },
            attributes: ['url']
        });

        if (imageURL) {
            spot.previewImage = imageURL.url;
        } else {
            spot.previewImage = null;
        };

        result.push(spot);
    };

    res.json({ Spots: result });
});

// #13 & #14 EDIT A SPOT | ERROR CODE
router.put('/:spotId', async (req, res) => {
    const { spotId } = req.params;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        return res
        .status(404)
        .json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    };

    try {
        await spot.update({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        });

        return res.json(spot);

    } catch (error) {
        res
        .status(404)
        .json({
            message: 'Validation Error',
            statusCode: 400,
            errors: {
              address: 'Street address is required',
              city: 'City is required',
              state: 'State is required',
              country: 'Country is required',
              lat: 'Latitude is not valid',
              lng: 'Longitude is not valid',
              name: 'Name must be less than 50 characters',
              description: 'Description is required',
              price: 'Price per day is required'
            }
          })
    };
});

// #24-26: CREATE BOOKING BASED ON SPOT ID | 2 ERRORS
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body;
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        res
            .status(404)
            .json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
    }

    const bookings = await Booking.findAll({
        where: {
            spotId: spot.id
        }
    });

    if (!startDate || !endDate || endDate <= startDate) {
        res
        .status(403)
        .json({
            message: 'Validation error',
            statusCode: 400,
            errors: {
                endDate: 'endDate cannot be on or before startDate'
            }
        })
    }

    for (let booking of bookings) {
        if (booking.startDate >= startDate && booking.endDate <= endDate ||
            booking.startDate <= startDate && booking.endDate >= endDate
            // booking.startDate >= startDate && booking.endDate >= endDate ||
            // booking.startDate <= startDate && booking.endDate <= endDate
            ) {
                return res
                .status(403)
                .json({
                    message: "Sorry, this spot is already booked for the specified dates",
                    statusCode: 403,
                    errors: {
                        startDate: "Start date conflicts with an existing booking",
                        endDate: "End date conflicts with an existing booking"
                    }
                })
            }
        }

        const newBooking = await Booking.create({
            startDate: startDate,
            endDate: endDate,
            userId: req.user.id,
            spotId: spot.id
        })

        res.json(newBooking)
    });

    // #08 | #09: CREATE AN IMAGE FOR A SPOT
    router.post('/:spotId/images', requireAuth, async (req, res) => {
        const { url, preview } = req.body;
        const spot = await Spot.findByPk(req.params.spotId);

        if (!spot) {
        res.status(404);
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    };

    const spotImage = await SpotImage.create({
        spotId: req.params.spotId,
        url: url,
        preview
    });

    return res.json({
        id: spotImage.id,
        url: spotImage.url,
        preview: spotImage.preview
    });
});

// #15 - #17 CREATE A REVIEW FOR A SPOT
router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId);

    // ERROR #2: Error Check Invalid Spot Id
    // Error response: Couldn't find a Spot with the specified id (findByPk)

    // Ben's Error method
    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.title = "Missing item"
        err.status = 403

        return next(err);
        // return res
        // .status(404)
        // .json({
        //     message: "Spot couldn't be found",
        //     statusCode: 404
        //   });
    };

    // ERROR #1: Previous Review for User/Spot Already Exists
    const existingReview = await Review.findOne({
        where: {
            userId: req.user.id,
            spotId: spotId
        }
    });


    if (existingReview) {
        const err = new Error('User already has a review for this spot');
        err.title = "Duplicate review"
        err.status = 403

        return next(err);
        // return res
        // .status(403)
        // .json({
        //     message: 'User already has a review for this spot',
        //     statusCode: 403
        //   });
    };

    // ERROR #3: Throw error for Body Validation
    try {
        const newReview = await Review.create({
            userId: req.user.id,
            spotId: Number(spotId),
            review: req.body.review,
            stars: req.body.stars
        });

        return res.status(201).json(newReview);

    } catch (error) {
        const err = new Error('User already has a review for this spot');
        err.title = "Duplicate review"
        err.status = 403

        err.errors = [err.message]

        return next(err);
        // return res
        //     .status(400)
        //     .json({
        //         message: 'Validation error',
        //         statusCode: 400,
        //         errors: {
        //             review: 'Review text is required',
        //             stars: 'Stars must be an integer from 1 to 5',
        //         }
            // })
        }
    });

// #07: CREATE A SPOT
router.post('/', requireAuth, async (req, res) => {
    const user = req.user;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    try {
        const newSpot = await Spot.create({
            ownerId: user.id,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        });

        res.status(201).json(newSpot);
    }

    catch {
        res.status(400);
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: {
                address: 'Street address is required',
                city: 'City is required',
                state: 'State is required',
                country: 'Country is required',
                lat: 'Latitude is not valid',
                lng: 'Longitude is not valid',
                name: 'Name must be less than 50 characters',
                description: 'Description is required',
                price: 'Price per day is required'
            }
        });
    };
});

// #28 & 29: GET ALL BOOKINGS FOR A SPOT BY ID
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const { spotId } = req.params;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        res
            .status(404)
            .json({
                message: "Spot couldn't be found",
                statusCode: 404
              });
    };

    const booking = await Booking.findAll({
        where: { spotId : spotId },
        include: [{
            model: User,
            attributes: [ 'id', 'firstName', 'lastName' ]
        }]
    });

    const differentOwner = await Booking.findAll({
        where: { spotId : spotId },
        attributes: [ 'spotId', 'startDate', 'endDate' ]
    });

    if (userId === spot.ownerId) return res.json({ Bookings : booking });
    else return res.json({ Bookings : differentOwner });
});

// #21 & 22: GET REVIEWS BY SPOT ID | ERROR
router.get('/:spotId/reviews', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);

    // IF SPOT COULD NOT BE FOUND BY SPOT ID
    if (!spot) {
        res
        .status(404)
        .json({
            message: "Spot couldn't be found",
            statusCode: 404
          });
    };

    const reviews = await Review.findAll({
        where: { spotId: req.params.spotId },
        include: [
            {
                model: User,
                attributes: [ 'id', 'firstName', 'lastName' ]
            },

            {
                model: ReviewImage,
                attributes: [ 'id', 'url' ]
            }
        ]
    });

    res.json({ Reviews: reviews });
})

// #11 & #12: GET DETAILS OF A SPOT BY ID
router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params;

    const details = await Spot.findByPk(spotId, {
        attributes: [
            'id',
            'ownerId',
            'address',
            'city',
            'state',
            'country',
            'lat',
            'lng',
            'name',
            'description',
            'price',
            'createdAt',
            'updatedAt'
        ]
    });

    if (!details) {
        res
        .status(404)
        .json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    };

    const reviewCount = await Review.count({ where: { spotId: spotId } });

    const starSum = await Review.sum('stars', { where: { spotId: spotId } });

    const spotImage = await SpotImage.findAll({
        where: { spotId: spotId },
        attributes: [ 'id', 'url', 'preview' ]
    });

    const owner = await User.findByPk(details.ownerId, { attributes: [ 'id', 'firstName', 'lastName' ] });

    let avgRating
    if(starSum === null) {
        avgRating = 0;
    } else {
        avgRating = (starSum / reviewCount).toFixed(1);
    };

    const result = details.toJSON();

    result.numReviews = reviewCount;
    result.avgStarRating = Number(avgRating);
    result.SpotImages = spotImage;
    result.Owner = owner;

    return res.json(result);
});

// #06: GET ALL SPOTS
router.get('/', async (req, res) => {
    let { page, size } = req.query;

    if (!page || page <= 0) page = 1;
    if (!size || size <= 0) size = 20;

    if (page > 10)          page = 10;
    if (size > 20)          size = 20;

    let pagination = {};
    if (page >= 1 && size >= 1) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    }

    const spots = await Spot.findAll( { ...pagination } );

    let result = [];
    for (let spot of spots) {
        spot = spot.toJSON();

        const ratings = await Review.findAll({
            where: { spotId : spot.id },
            attributes: [[ sequelize.fn('AVG', sequelize.col('stars')), 'avgRating' ]]
        });

        spot.avgRating = Number(ratings[0].toJSON().avgRating);

        const imageURL = await SpotImage.findOne({
            where: { spotId : spot.id, preview : true },
            attributes: ['url']
        });

        if (imageURL) {
            spot.previewImage = imageURL.url;
        } else {
            spot.previewImage = null;
        };

        result.push(spot);
    };

    res.json({ Spots : result , page, size });
});


// 2nd to last: DELETE A SPOT
router.delete('/:spotId', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        res
        .status(404)
        .json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    };

    spot.destroy();
    return res.json({
        message: 'Successfully deleted',
        statusCode: 200
    });
});

module.exports = router;
