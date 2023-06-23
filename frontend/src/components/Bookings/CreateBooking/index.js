import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createBookingThunk } from "../../../store/bookings";
import "./Bookings.css";

const CreateBookingForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [checkin, setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');
    const [guestsNum, setGuestNum] = useState('');

    const [validationErrors, setValidationErrors] = useState('');
    // validation errors on submit: date booked is free, too many guests,
    // too far out, user must be logged in, owner of home cant book themselves

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validationErrors.length > 0) return
        const bookingFormInputs = {
            checkin,
            checkout,
            guestsNum
        };

        const newBooking = await dispatch(createBookingThunk(bookingFormInputs));
        // once booked have a booking confirmation module
        // return history.push(`/bookings/${newBooking.id}`);

    }

    return (
        <form
            className='create-new-booking-form'
            onSubmit={handleSubmit}
        >
            <div className="bookings-container">
                <div id="booking-header">
                    <h2 id="price-per-night-1">PRICE</h2>
                    <h2 id="avg-star-review">AVG STAR</h2>
                    <h2 id="num-of-reviews">NUM OF REVIEWS</h2>
                </div>

                <div id="booking-info">

                    <label id="checkin">CHECKIN DATE</label>
                    <input id="checkin-input"
                        type="date"
                        name="checkin"
                        value={checkin}
                        onChange={e => setCheckin(e.target.value)}
                    />

                    <label id="checkout">CHECKOUT DATE</label>
                    <input id="checkout-input"
                        type="date"
                        name="checkout"
                        value={checkout}
                        onChange={e => setCheckout(e.target.value)}
                    />

                    <label id="guests">NUMBER OF GUESTS</label>
                    <input id="num-of-guests"
                        type="number"
                        name="guestsNum"
                        value={guestsNum}
                        onChange={e => setGuestNum(e.target.value)}
                    />
                </div>

                <button>RESERVE</button>
                <>YOU WON'T BE CHARGED YET</>

                <div id="booking-footer">
                    <h2 id="price-per-night-2">PRICE</h2>
                </div>
            </div>
        </form>
    )
}

export default CreateBookingForm;