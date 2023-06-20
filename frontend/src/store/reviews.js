// frontend/src/store/reviews.js
import { csrfFetch } from "./csrf";

// CREATE | POST | CREATE A REVIEW FOR A SPOT
const CREATE_REVIEW     = '/reviews/createReview';

// READ | GET | GET REVIEWS BY SPOT ID
const GET_REVIEWS       = '/reviews/getReviews';

// UPDATE | PUT | UPDATE REVIEW BY SPOT ID AND REVIEW ID
const UPDATE_REVIEW     = 'reviews/updateReview';

// DELETE | DELETE | DELETE REVIEW BASED ON REVIEW ID
const DELETE_REVIEW     = 'reviews/deleteReview';

// ACTION | CREATE | POST
const createReviewAction = (data, currentUser) => {
    // payload will be the new review
    // data will be the review | spotID will be the spotID for spotDetails
    return {
        type: CREATE_REVIEW,
        payload: {
            data,
            currentUser
        }
    };
};

// ACTION | READ | GET
const getReviewsAction = (payload) => {
    // payload is the review in the SpotDetails (by spotId)
    // data will be the review | spotID will be the spotID for spotDetails
    return {
        type: GET_REVIEWS,
        payload
        // payload: {
        //     data,
        //     spotId
        // }
    };
};

// ACTION | UPDATE | PUT
const updateReviewAction = (payload) => {
    // payload in the review
    // data will be the review | reviewId is id of review
    return {
        type: UPDATE_REVIEW,
        payload
    };
};

// ACTION | DELETE | DELETE
const deleteReviewAction = (payload) => {
    // payload will be the reviewId
    return {
        type: DELETE_REVIEW,
        payload
    };
};

// THUNK | CREATE | POST
export const createReviewThunk = (payload, spotId, currentUser) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(createReviewAction(data, currentUser))
        return data;
    }
}

// THUNK | READ | GET
export const getReviewsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const data = await response.json();
        await dispatch(getReviewsAction(data));
        return data;
    };
};

// THUNK | UPDATE | PUT
export const updateReviewThunk = (payload, reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {'Content': 'application/json'},
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const data = await response.json();
        await dispatch(updateReviewAction(data));
        return data;
    };
};

// THUNK | DELETE | DELETE
export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const data = response.json();
        await dispatch(deleteReviewAction(reviewId));
        return data;
    };
};

const initialState = {};
const reviewsReducer = (state = initialState, action) => {
    let newState = {};

    switch (action.type) {
        case GET_REVIEWS:
            action.payload.Reviews.forEach(review => {
                newState[review.id] = review;
            });
            return newState;


        case CREATE_REVIEW:
            newState = {...state};
            newState[action.payload.data.id] = {...action.payload.data, User:{id: action.payload.currentUser.id, firstName: action.payload.currentUser.firstName, lastName: action.payload.currentUser.lastName}};
            return newState;

        case UPDATE_REVIEW:
            newState = {...state}
            newState[action.payload.id] = {...newState[action.payload.id], ...action.payload}
            return newState;


        case DELETE_REVIEW:
            newState = {...state};
            delete newState[action.payload];            // deleting reviewID (which is the payload)
            return newState;


        default:
            return state;
    };
};

export default reviewsReducer;
