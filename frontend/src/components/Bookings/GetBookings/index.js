import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookingsThunk } from "../../../store/spots";
import { NavLink } from "react-router-dom";
import "./GetBookings.css";

const GetBookings = () => {
    const dispatch = useDispatch();
    const bookings = useSelector((state) => {
        return state.bookings
    })

    const [isLoaded, setIsLoaded] = useState(false);
    const allBookings = Object.values(bookings);

    useEffect(() => {
        dispatch(getAllBookingsThunk()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        isLoaded && (
            <>
                <div className="all-bookings-wraps">
                    <div className="all-bookings-container">
                        {allBookings.map((booking) => (
                            <div key={booking.id} className="individual-booking-container">
                                <NavLink to={`/bookings/${booking.id}`}>
                                    <img
                                        className="booking-card"
                                        src={booking?.previewImage || ""}
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