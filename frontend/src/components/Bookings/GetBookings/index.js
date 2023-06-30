import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookingsThunk, updateBookingThunk, deleteBookingThunk } from "../../../store/bookings"
import { NavLink } from "react-router-dom";
import "./GetBookings.css";

const GetBookings = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    const sessionUser = useSelector(state => state.session.user);

    const allBookingsObj = useSelector(state => state.bookings);
    const allBookingsArr = Object.values(allBookingsObj)
    const sessionUsersBookings = allBookingsArr.find(booking => booking.userId === sessionUser.id)

    useEffect(() => {
        dispatch(getUserBookingsThunk()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        isLoaded && (
            <>
                <div className="all-bookings-wraps">
                    <h1>MY BOOKINGS</h1>
                    <div className="all-bookings-container">
                        {allBookingsArr.map((booking) => (
                            <div className="individual-booking-container">
                                <NavLink to={`/spots/${booking.spotId}`}>
                                    <img
                                        className="booking-card"
                                        src={booking?.Spot?.previewImage || ""}
                                        onError={(e) => (
                                            e.target.src = "https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png"
                                        )}
                                        alt="one-booking-card"
                                    />

                                    <div className="booking-decription-container">
                                        <div id="booking-description-left">
                                            <div id="booking-prop-1-name">{booking.name}</div>
                                            <div id="booking-prop-2-city-state">{booking.city}, {booking.state}</div>
                                        </div>

                                        <div id="booking-description-right">
                                            <div id="booking-prop-3-avg-star-rating">
                                                {booking?.avgRating?.toFixed(2) || 0}</div>
                                            <div id="booking-prop-4-price">
                                                ${booking.price} per night
                                            </div>
                                            <div id="booking-prop-5-dates">
                                                {booking.checkin} - {booking.checkout}
                                            </div>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        )
    )
}

export default GetBookings;