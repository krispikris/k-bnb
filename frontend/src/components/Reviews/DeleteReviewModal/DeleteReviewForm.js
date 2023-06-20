// frontend/src/components/DeleteReviewModal/DeleteReviewForm.js
import    React                             from "react";
import  { useDispatch }                     from "react-redux";
import  { deleteReviewThunk }               from "../../../store/reviews";
import                                           "./DeleteReview.css";

const DeleteReviewForm = ({setShowModal, reviewToUpdate}) => {
    const dispatch          = useDispatch();

    // console.log('======', reviewToUpdate);

    const deleteReview = async (e) => {
        e.preventDefault();

        await dispatch(deleteReviewThunk(reviewToUpdate.id));
        setShowModal(false);
    }

return (
    <>
        <form
            className='delete-review-form'
            onSubmit={deleteReview}
            >

        <label id="delete-review-title">DELETE YOUR REVIEW</label>
        {/* <label id="how-was-your-stay">How was your Experience?</label> */}

            <h3 id="delete-confirmation">Are you sure you want to delete your review?</h3>
            <button id="delete-review-submit" type="submit">Delete Your Review</button>
        </form>
    </>
    )
};

export default DeleteReviewForm;
