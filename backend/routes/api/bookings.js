const express = require('express');
const router = express.Router();
const { Spot, SpotImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

// #27 GET ALL CURRENT USER'S BOOKINGS
router.get('/current', requireAuth, async (req, res) => {
    const allCurrBookings = await Booking.findAll({
        where: { userId : req.user.id },
        include: [{
            model: Spot,
            attributes: { exclude: [ 'description', 'createdAt', 'updatedAt' ] }
        }]
    });

    let result = [];
    for (let booking of allCurrBookings) {
        booking = booking.toJSON();

        const image = await SpotImage.findOne({
            where: { spotId : booking.spotId, preview : true },
            attributes: [ 'url' ]
        });

        if (image) booking.Spot.previewImage = image.url;
        else booking.Spot.previewImage = null;

        result.push(booking);
    };

    res.json({ Bookings : result })
});

// #30 & 31: EDIT A BOOKING | ERROR
router.put('/:bookingId', requireAuth, async (req, res) => {
    const { bookingId } = req.params;
    const { startDate, endDate } = req.body;
    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
        res
        .status(404)
        .json({
            message: "Booking couldn't be found",
            statusCode: 404
          });
    };

    const updatedBooking = await booking.update({
        // spotId: booking.id,
        // userId: req.user.id,
        startDate: startDate,
        endDate: endDate
    });

    res.json(updatedBooking);
});


router.delete('/:bookingId', requireAuth, async (req, res) => {
    const { bookingId } = req.params;
    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
        res
        .status(404)
        .json({
            message: "Booking couldn't be found",
            statusCode: 404
          });
    };

    await booking.destroy();
    res.json({
        message: 'Successfully deleted',
        statusCode: 200
    });
});

module.exports = router;
