const express = require('express');
const router = express.Router();
const { User, Spot, SpotImage, Booking, Like } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

// CREATE A LIKE
router.get('/spotId/:likeId', requireAuth, async (req, res) => {
    const user = req.user;
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId);

    if (!user) {
        return res
            .status(404)
            .json({
                message: "You must be logged in to like a Spot",
                statusCode: 404
            })
    }

    if (!spot) {
        return res
            .status(404)
            .json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
    }

    const newLike = await Like.create({
        userId: req.user.id,
        spotId: spotId
    });

    return res.json(newLike)
})

// GET LIKES BY THE CURRENT USER (WISHLIST)
router.get('/wishlist', requireAuth, async (req, res) => {
    // const wishlist = await Spot.findAll({            Spot should be attached to Like so the SpotImage can be found
    const wishlist = await Like.findAll({
        where: { userId: req.user.id }
    })

    let result = [];
    for (let like of wishlist) {
        like = like.toJSON();

        const image = await SpotImage.findOne({
            where: { spotId: like.spotId, preview: true },
            attributes: ['url']
        });

        if (image) like.Spot.previewImage = image.url;
        else like.Spot.previewImage = null;
    }


    res.json({ Likes: result })
});

// DELETE LIKE
router.delete('/:likeId', requireAuth, async (req, res) => {
    const { likeId } = req.params;
    const like = await Like.findByPk(likeId);

    if (!like) {
        res
            .status(404)
            .json({
                message: "Have not liked",
                statusCode: 404
            });
    };

    await like.destroy();

})

module.exports = router;