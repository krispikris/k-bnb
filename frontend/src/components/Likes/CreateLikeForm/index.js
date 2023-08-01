// frontend/src/components/Likes/CreateLikeForm/index.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createLikeThunk } from "../../../store/likes";
import "./Likes.css";

const CreateLikeForm = ({ spot }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.sessionUser)
    const [validationErrors, setValidationErrors] = useState('')
    const [like, setLike] = useState('')
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

        let likeInput = { like }

        if (!sessionUser) return alert("You must be logged in to like this listing.")
        if (sessionUser.id === spot.ownerId) return alert("You are hosting this spot. You cannot like your own spot.")


        dispatch(createLikeThunk(likeInput, spot.id, sessionUser))

        // const newLike = await dispatch(createLikeThunk(like, spot.id))
        // if (newLike) history.push('/wishlist')

    }

    return (
        <div className="likes-container">
            <input id="like-submit"
                type="text"
                name="like"
                value={like}
                onChange={e => setLike(e.target.value)}
                required
            />
            <button id="create-like" type="submit">Like</button>
        </div>

    )
};

export default CreateLikeForm;