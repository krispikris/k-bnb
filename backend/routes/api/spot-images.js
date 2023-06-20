const express = require('express');
const router = express.Router();

const { SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

// #32: DELETE SPOT IMAGE
router.delete('/:imageId', requireAuth, async (req, res) => {
    const { imageId } = req.params;
    const spotImage = await SpotImage.findByPk(imageId);
    // const imageToDelete = await SpotImage.findByPk(req.params.imageId, {
    //     where: { userId: req.user.id }
    // });

    if (!spotImage) {
        res
        .status(404)
        .json({
            message: "Spot Image couldn't be found",
            statusCode: 404
          });
    };

    await spotImage.destroy();
    res.json({
        message: 'Successfully deleted',
        statusCode: 200
      });
});

module.exports = router;
