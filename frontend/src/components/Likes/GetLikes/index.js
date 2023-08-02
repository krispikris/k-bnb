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

    const allLikes = useSelector(state => state.likes)
    const allLikeArr = Object.values(allLikes)
    const userLikes = allLikeArr.find(user => user.id === parseInt(userId))

    // need to be sure the like belongs to the current session user

    useEffect(() => {
        dispatch(getUserLikesThunk()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        isLoaded && (
            <div className="all-likes-wrap">
                <div className="all-likes-container">
                    {allLikes.map((user) => (
                        <div key={user.id} className="individual-like-container">
                            {/* <NavLink to={'/spot/${spot.id}'} */}

                        </div>
                    ))}
                </div>
            </div>
        )
    )
}

export default GetLikes;