const express = require('express');
const router = express.Router();
const { User, Spot, SpotImage, Booking, Like } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

// GET LIKES BY THE CURRENT USER (WISHLIST)
router.get('/wishlist', requireAuth, async (req, res) => {
    const wishlist = await Spot.findAll({
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