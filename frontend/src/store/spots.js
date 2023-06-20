import { csrfFetch } from "./csrf";

// CREATE | POST
const CREATE_SPOT = "spots/createSpot";
const CREATE_SPOT_IMAGE = "spots/createSpotImage";

// READ | GET
const GET_SPOTS = "spots/getSpots";
const GET_ONE_SPOT = "spots/getOneSpot";
const GET_USER_SPOT = "spots/getUserSpot";

// UPDATE | PUT
const UPDATE_SPOT = "spots/updateSpot";

// DELETE
const DELETE_SPOT = "spots/deleteSpot";

// ACTIONS | READ | GET
const getAllSpotsAction = (payload) => {
  return {
    type: GET_SPOTS,
    payload,
  };
};

const getOneSpotAction = (payload) => {
  return {
    type: GET_ONE_SPOT,
    payload,
  };
};

const getUserSpotAction = (payload) => {
  return {
    type: GET_USER_SPOT,
    payload,
  };
};

const createSpotImageAction = (payload) => {
  return {
    type: CREATE_SPOT_IMAGE,
    payload,
  };
};

// ACTIONS | UPDATE | PUT
const updateSpotAction = (payload) => {
  return {
    type: UPDATE_SPOT,
    payload,
  };
};

// ACTIONS | DELETE
const deleteSpotAction = (payload) => {
  return {
    type: DELETE_SPOT,
    payload,
  };
};

// THUNK | READ | GET
export const getAllSpotsThunk = () => async (dispatch) => {
  const response = await fetch("/api/spots");

  if (response.ok) {
    const data = await response.json();
    dispatch(getAllSpotsAction(data));
    return data;
  }
};

export const getOneSpotThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getOneSpotAction(data));
    return data;
  }
};

export const getUserSpotThunk = () => async (dispatch) => {
  const response = await csrfFetch("api/spots/current");

  if (response.ok) {
    const data = await response.json();
    dispatch(getUserSpotAction(data));
    return data;
  }
};

// THUNK | CREATE | POST
export const createSpotThunk = (payload) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const data = await response.json();
    // dispatch(createSpotAction(data))
    dispatch(getOneSpotThunk(data.id));

    return data;
  }
};

export const createSpotImageThunk = (payload, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createSpotImageAction(data));
    return data;
  }
};

// THUNK | UPDATE | PUT
export const updateSpotThunk = (payload, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(updateSpotAction(data));
    return data;
  }
};

// THUNK | DELETE
export const deleteSpotThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteSpotAction(spotId));
    return data;
  }
};

// REDUCER
let initialState = {};
const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOTS: {
      const newState = { ...state };
      action.payload.Spots.forEach((spot) => {
        newState[spot.id] = spot;
      });
      return newState;
    }

    case GET_ONE_SPOT: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...newState[action.payload.id],
        ...action.payload,
      };
      newState[action.payload.id] = action.payload;
      return newState;
    }

    case CREATE_SPOT: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      // console.log('THIS IS THE NEWSTATE.PAYLOAD: ', newState.payload)
      return newState;
    }

    case UPDATE_SPOT: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...newState[action.payload.id],
        ...action.payload,
      };
      return newState;
    }

    case DELETE_SPOT: {
      const newState = { ...state };
      delete newState[action.payload]; // payload is the spotId because we don't need data from deleteTHUNK(line 160)
      return newState;
    }

    default:
      return state;
  }
};

export default spotsReducer;

// const newState = Object.assign({}, state);

// ORDER: THUNK, ACTION, REDUCER
// THUNK: PULLS INFORMATION
// ACTION: STORE THAT DATA IN THE PAYLOAD
// TYPE: WHAT IS HAPPENING WITH THE PAYLOAD (BANANA-BLE)
// REDUCER: CREATES A COPY OF THE STATE TO REPLACE THE DEFAULT OR OLD STATE (SIMILAR TO MIDDLEWARE)

// newState.action.spot;
// newState = {
//     singleSpot: {
//         [action.spot.id] : newSpot
//     }
// }

// case CREATE_SPOT_IMAGE: {
//     // newState = {...state};
//     newState.singleSpot.SpotImages = [action.spotId.previewImage]
//     return {...newState}
// }
