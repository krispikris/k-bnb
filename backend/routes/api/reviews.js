const express = require('express');
const router = express.Router();
const { json } = require('sequelize');

const { requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage } = require('../../db/models');
// const { User, Spot, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');

// #23 && #24 | EDIT EXISTING REVIEW | ERROR
router.put('/:reviewId', requireAuth, async (req, res) => {
    const { reviewId } = req.params;
    const { review, stars } = req.body;
    const existingReview = await Review.findByPk(reviewId);

    if (!existingReview) {
        res
        .status(404)
        .json({
            message: "Review couldn't be found",
            statusCode: 404
        });
    };

    try {
        existingReview.review = review;
        existingReview.stars = stars;
        await existingReview.save();

        return res.json(existingReview);

    } catch (error) {
        res
        .status(400)
        .json({
            message: 'Validation error',
            statusCode: 400,
            errors: {
                review: 'Review text is required',
                stars: 'Stars must be an integer from 1 to 5',
            }
        });
    };
});

// #18 & 19: Create an Image for a Review | Error
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { url } = req.body;
    const { reviewId } = req.params;
    const review = await Review.findByPk(reviewId);

    if (!review) {
        res
        .status(404)
        .json({
            message: "Review couldn't be found",
            statusCode: 404
        });
    };

    // ERROR: MAX 10 images
    const imagesExist = ReviewImage.findAll({where: { reviewId: reviewId }});
    if (imagesExist.length >= 10) {
        res
        .status(403)
        .json({
            message: 'Maximum number of images for this resource was reached',
            statusCode: 403
        });
    };

    // CREATE NEW IMAGE
    const addImage = await ReviewImage.create({ url: url, reviewId: reviewId });

    return res.json({
        id: addImage.id,
        url: addImage.url
    });
});



// #20 GET REVIEWS OF CURRENT USER
router.get('/current', requireAuth, async (req, res) => {
    const reviews = await Review.findAll({
        where: { userId: req.user.id },
        include: [
        {
            model: User,
            attributes: [ 'id', 'firstName', 'lastName' ]
        },

        {
            model: Spot,
            attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
        },

        {
            model: ReviewImage,
            attributes: { exclude: ['reviewId', 'createdAt', 'updatedAt' ] }
        }
    ]
    });

    let result = [];
    for (let review of reviews) {
        review = review.toJSON();

        const image = await SpotImage.findByPk(review.id, {
            where: { preview: true },
            attributes: [ 'url' ]
        });

        review.Spot.previewImage = image.url;
        result.push(review);
    };

    return res.json({ 'Reviews': result });
});

router.delete('/:reviewId', requireAuth, async (req, res) => {
    const { reviewId } = req.params;
    const review = await Review.findByPk(reviewId);

    if (!review) {
        res
        .status(404)
            json({
            message: "Review couldn't be found",
            statusCode: 404
          });
    };

    review.destroy();
    res.json({
        message: 'Successfully deleted',
        statusCode: 200
    });
});

module.exports = router;
