// frontend/src/store/likes.js
import { csrfFetch } from "./csrf";

// CREATE | POST | CREATE A LIKE FOR A SPOT
const CREATE_LIKE = '/likes/createLike';

// READ | GET | GET LIKES BY SPOT ID
const GET_USER_LIKES = '/likes/getUserLikes';
// const GET_SPOT_LIKES = 'likes/getSpotLikes';

// DELETE | DELETE | DELETE LIKE BASED ON LIKE ID
const DELETE_LIKE = 'likes/deleteLike';

// ACTION | CREATE | POST
const createLikeAction = (payload) => {
    // payload will be the new like
    // data will be the like | spotID will be the spotID for spotDetails
    return {
        type: CREATE_LIKE,
        payload
        // payload: {
        //     data,
        //     currentUser
        // }
    };
};

// ACTION | READ | GET
const getUserLikesAction = (payload) => {
    // payload is the like in the SpotDetails (by spotId)
    return {
        type: GET_USER_LIKES,
        payload
        // payload: {
        //     data,
        //     spotId
        // }
    };
};

// ACTION | READ | GET
// const getSpotLikesAction = (payload) => {
//     // payload is the like in the SpotDetails (by spotId)
//     return {
//         type: GET_SPOT_LIKES,
//         payload
//         // payload: {
//         //     data,
//         //     spotId
//         // }
//     };
// };

// ACTION | DELETE | DELETE
const deleteLikeAction = (payload) => {
    // payload will be the likeId
    return {
        type: DELETE_LIKE,
        payload
    };
};

// THUNK | CREATE | POST
export const createLikeThunk = (payload, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/likes/${spotId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(createLikeAction(data))
        return data;
    }
}

// THUNK | READ | GET
// spotId in this case could also be userId
export const getUserLikesThunk = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/likes/${userId}`);

    if (response.ok) {
        const data = await response.json();
        await dispatch(getUserLikesAction(data));
        return data;
    };
};

// GETTING LIKES FOR SPOT
// export const getSpotLikesThunk = (spotId) => async (dispatch) => {
//     const response = await csrfFetch(`/api/spots/${spotId}/likes`);

//     if (response.ok) {
//         const data = await response.json();
//         await dispatch(getSpotLikesAction(data));
//         return data;
//     };
// };

// THUNK | DELETE | DELETE
export const deleteLikeThunk = (likeId) => async (dispatch) => {
    const response = await csrfFetch(`/api/likes/${likeId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const data = response.json();
        await dispatch(deleteLikeAction(likeId));
        return data;
    };
};

const initialState = {};
const likesReducer = (state = initialState, action) => {
    let newState = {};

    switch (action.type) {
        case GET_USER_LIKES: {
            const newState = { ...state };
            action.payload.Likes.forEach((like) => {
                newState[like.id] = like;
            });
            return newState;
        }

        // case GET_SPOT_LIKES: {
        //     const newState = { ...state };
        //     action.payload.Likes.forEach((like) => {
        //         newState[like.id] = like;
        //     });
        //     return newState;
        // }

        case CREATE_LIKE:
            newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState;

        case DELETE_LIKE:
            newState = { ...state };
            delete newState[action.payload];            // deleting likeId (which is the payload)
            return newState;

        default:
            return state;
    };
};

export default likesReducer;
