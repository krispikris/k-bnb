// frontend/src/components/UpdateReviewModal/UpdateReviewForm.js
import    React, { useState, useEffect }    from "react";
import  { useDispatch }                     from "react-redux";
import  { updateReviewThunk }               from "../../../store/reviews";
import                                           "./UpdateReviewForm.css";

const UpdateReviewForm = ({setShowModal, reviewToUpdate}) => {
    // updateReviewForm takes in a prop
    // prop is being deconstructed

    const reviewId = reviewToUpdate.id;
    const dispatch = useDispatch();

    const [review, setReview] = useState(reviewToUpdate.review);
    const [stars, setStars] = useState(reviewToUpdate.stars)

    const [validationErrors, setValidationErrors] = useState([]);

    // console.log('==================', reviewToUpdate);
    // console.log('==================', reviewId);
    // console.log('==================', reviewToUpdate.review);
    // console.log('==================', reviewToUpdate.stars);

    useEffect(() => {
        const errors = [];

        if (!review || review.length < 1 || review.length > 256) {
            errors.push('Please leave a review more than 1 and less than 256 characters.')
        }
        if (!stars) errors.push('Please add star rating between 1 and 5.')

        setValidationErrors(errors);
    }, [review, stars])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validationErrors.length > 0) return

        let updatedReviewInput = {
            review,
            stars
        };

        await dispatch(updateReviewThunk(updatedReviewInput, reviewId));
        setShowModal(false);
    };

return (
    <form
        className='update-review-form'
        onSubmit={handleSubmit}
        >

        <div className='errors-create-review-form'>
            {validationErrors.length > 0 && (
                <ul className='create-review-errors'>
                    {validationErrors.map(e => (
                    <li key={e}>{e}</li>
                    ))}
                </ul>
            )}
        </div>

        <label id="update-review-title">UPDATE YOUR REVIEW</label>

        <label id="update-review-input-title">Updated Review</label>
            <textarea id="update-review-input-1"
            type="text"
            name="review"
            value={review}
            onChange={e => setReview(e.target.value)}
            />

        <label id="update-review-input-title">Updated Star Count</label>
            <input id="update-review-input-2"
            type="number"
            name="stars"
            min='1'
            max='5'
            value={stars}
            onChange={e => setStars(e.target.value)}
            />

            <button id="update-review-submit" type="submit">Update Review</button>

        </form>

    )
};

export default UpdateReviewForm;
