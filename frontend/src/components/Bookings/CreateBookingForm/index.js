import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createBookingThunk } from "../../../store/bookings";
import "./Bookings.css";
// import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const CreateBookingForm = ({ spot }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)

    // debugger
    console.log("spot variable: ", spot);
    console.log("session user variable: ", sessionUser);

    const [checkin, setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');
    const [guestsNum, setGuestNum] = useState('');

    const [validationErrors, setValidationErrors] = useState('');
    // validation errors on submit: date booked is free, too many guests,
    // too far out, user must be logged in, owner of home cant book themselves

    // const bookingsArr = Object.values(useSelector(state => state.bookings));
    // const currentSpotBookings = bookingsArr.filter(book => book.spot.id === spot.id)

    // console.log("THIS IS THE BOOKINGS FOR THIS SPOT: ", currentSpotBookings)

    const totalBeforeTaxes = (num) => {
        let fees = Math.round(num * 0.3) + Math.round(num * 0.2);
        let total = parseInt(num) + parseInt(fees);

        return total;
    }

    const numOfDays = (date1, date2) => {
        let startDate = new Date(date1);
        let endDate = new Date(date2);
        let timeDiff = endDate.getTime() - startDate.getTime();
        let dayDiff = timeDiff / (1000 * 3600 * 24);

        return dayDiff;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validationErrors.length > 0) return
        const bookingFormInputs = {
            checkin,
            checkout,
            guestsNum
        };

        const newBooking = await dispatch(createBookingThunk(bookingFormInputs));
        if (newBooking) history.push(`/trips`);


        // once booked have a booking confirmation module
        // return history.push(`/bookings/${newBooking.id}`);


        // session user
        // error validations (backend as well)
        // mybookings/boookingId
        // booking/bookingId
        // user making the booking and time
        // express goes to view
        // spots/spotId/bookingId
        // index request
    }

    useEffect(() => {
        const errArr = [];
        if (sessionUser?.user === null) errArr.push("To reserve booking, please log in.");

        setValidationErrors(errArr);
    }, [dispatch, sessionUser, checkin, checkout])

    return (
        <div className="bookings-container">
            <div id="booking-header">
                <h2 id="price-per-night">${spot?.price} night</h2>
                <h2 id="avg-star-review-&-num-of-reviews"><i className="fa-solid fa-star"></i>{spot.avgStarRating.toFixed(2)} ・ {spot.numReviews} reviews</h2>
            </div>

            <div className="reserve-container">
                <form className="reserve-form" onSubmit={handleSubmit}>
                    <label id="checkin">CHECK-IN</label>
                    <input id="checkin-input"
                        type="date"
                        name="checkin"
                        value={checkin}
                        onChange={e => setCheckin(e.target.value)}
                        required
                    />

                    <label id="checkout">CHECKOUT</label>
                    <input id="checkout-input"
                        type="date"
                        name="checkout"
                        value={checkout}
                        onChange={e => setCheckout(e.target.value)}
                        required
                    />

                    <label id="guests-num">GUESTS</label>
                    <input id="guests-num-dropdown"
                        type="number"
                        min="1"
                        max="8"
                        name="guests-num"
                        placeholder="1 guest"
                        value={guestsNum}
                        onChange={e => setGuestNum(e.target.value)}
                        required
                    />
                    <button className="reserve-button" type="submit">Reserve</button>

                    <>You won't be charged yet</>
                </form>
            </div>



            <div id="fees-container">
                <div id="1-price-multiply-num-nights">
                    <h3>${spot.price} x {numOfDays(checkin, checkout)} nights ${Math.round(spot.price * numOfDays(checkin, checkout))}</h3>
                </div>
                <div id="2-cleaning-fee">
                    <h3>Cleaning fee ${Math.round(spot.price * .3)}</h3>
                </div>
                <div id="3-treebnb-fee">
                    <h3>Treebnb service fee ${Math.round(spot.price * .2)}</h3>
                </div>
            </div>

            <div id="booking-footer">
                {/* <h2 id="price-per-night-2">Total before taxes ${Math.round(spot.price) + Math.round(spot.price * .3) + Math.round(spot.price * .2)} </h2> */}
                {/* <h2 id="price-per-night-2">Total before taxes ${totalBeforeTaxes(Math.round(spot.price * numOfDays(checkin, checkout)))} </h2> */}
                <h2 id="price-per-night-2">Total before taxes $ {Math.round(spot.price * numOfDays(checkin, checkout) + spot.price * .3 + spot.price * .2)} </h2>
            </div>
        </div>
    )
}

export default CreateBookingForm;