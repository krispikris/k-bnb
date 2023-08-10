// frontend/src/components/Likes/CreateLikeForm/index.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createLikeThunk } from "../../../store/likes";
import "./Likes.css";

const CreateLikeForm = ({ spotToLike }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const [validationErrors, setValidationErrors] = useState('')
    const [like, setLike] = useState(false)
    // const {spotId} = useParams()

    // console.log('THIS IS THE CURRENT USER AS AN OBJ: ', currentUser);
    // console.log('THIS IS THE SPOT ID OF LIKED SPOT: ', spotId);

    useEffect(() => {
        const errors = []

        if (sessionUser?.user === null) errors.push("You must be logged in to like this listing.")

        setValidationErrors(errors)
    }, [dispatch, sessionUser, like]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        // let likeInput = { like }

        // debugger
        if (!sessionUser) return alert("You must be logged in to like this listing. 222")
        if (sessionUser.id === spotToLike.ownerId) return alert("You are hosting this spot. You cannot like your own spot.")


        dispatch(createLikeThunk(spotToLike.id))

        // const newLike = await dispatch(createLikeThunk(like, spot.id))
        // if (newLike) history.push('/wishlist')

    }

    return (
        <div className="likes-container">
            {/* <form className="likes-form"
                onSubmit={handleSubmit}>
                <input id="like-submit"
                    type="text"
                    name="like"
                    value={like}
                    onChange={e => setLike(e.target.value)}
                />
            </form> */}
            <button
                id="create-like"
                type="submit"
                onClick={handleSubmit}
            >Like</button>
        </div>

    )
};

export default CreateLikeForm;