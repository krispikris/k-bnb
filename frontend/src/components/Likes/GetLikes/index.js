// should i have get likes on every page?
// if the spot is liked already should i leave the heart

// delete like will be in html as a button
// <button id="button-delete-like" onClick={() => dispatch(deleteLikeThunk(like.id))}>Delete like</button>

// frontend/src/components/Likes/GetLikes/index.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserLikesThunk, deleteLikeThunk } from "../../../store/likes"
import { NavLink } from "react-router-dom";
import "./GetLikes.css";

const GetLikes = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getUserLikesThunk()).then(() => setIsLoaded(true));
    }, [dispatch]);
}

export default GetLikes;