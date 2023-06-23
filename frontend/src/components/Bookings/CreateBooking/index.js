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

        </form>
    )
}

export default CreateBookingForm;