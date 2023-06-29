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
}

export default GetBookings;