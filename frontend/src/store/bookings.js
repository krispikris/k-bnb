import { csrfFetch } from "./csrf";

// CREATE | POST
const CREATE_BOOKING = "bookings/createBooking";

// READ | GET
const GET_BOOKINGS = "bookings/getBookings";
const GET_ONE_BOOKING = "bookings/getOneBooking";
const GET_USER_BOOKING = "bookings/getUserBooking";

// UPDATE | PUT
const UPDATE_BOOKING = "bookings/updateBooking";

// DELETE
const DELETE_BOOKING = "bookings/deleteBooking";

// ACTIONS | CREATE
const createBooking = (payload) => {
  return {
    type: CREATE_BOOKING,
    payload,
  };
};

// ACTIONS | READ | GET
const getAllBookingsAction = (payload) => {
  return {
    type: GET_BOOKINGS,
    payload,
  };
};

const getOneBookingAction = (payload) => {
  return {
    type: GET_ONE_BOOKING,
    payload,
  };
};

const getUserBookingAction = (payload) => {
  return {
    type: GET_USER_BOOKING,
    payload,
  };
};


// ACTIONS | UPDATE | PUT
const updateBookingAction = (payload) => {
  return {
    type: UPDATE_BOOKING,
    payload,
  };
};

// ACTIONS | DELETE
const deleteBookingAction = (payload) => {
  return {
    type: DELETE_BOOKING,
    payload,
  };
};


// THUNK | CREATE | POST
export const createBookingThunk = (payload) => async (dispatch) => {
  const response = await csrfFetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const data = await response.json();
    // dispatch(createBookingAction(data))
    dispatch(getOneBookingThunk(data.id));

    return data;
  }
};

// export const createBookingImageThunk = (payload, bookingId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/bookings/${bookingId}/images`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });

//   if (response.ok) {
//     const data = await response.json();
//     dispatch(createBookingImageAction(data));
//     return data;
//   }
// };

// THUNK | READ | GET
export const getAllBookingsThunk = () => async (dispatch) => {
  const response = await fetch("/api/bookings");

  if (response.ok) {
    const data = await response.json();
    dispatch(getAllBookingsAction(data));
    return data;
  }
};

export const getOneBookingThunk = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getOneBookingAction(data));
    return data;
  }
};

export const getUserBookingsThunk = () => async (dispatch) => {
  const response = await csrfFetch("api/bookings/current");

  if (response.ok) {
    const data = await response.json();
    dispatch(getUserBookingAction(data));
    return data;
  }
};

// THUNK | UPDATE | PUT
export const updateBookingThunk = (payload, bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(updateBookingAction(data));
    return data;
  }
};

// THUNK | DELETE
export const deleteBookingThunk = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteBookingAction(bookingId));
    return data;
  }
};

// REDUCER
let initialState = {};
const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKINGS: {
      const newState = { ...state };
      action.payload.Spots.forEach((booking) => {
        newState[booking.id] = booking;
      });
      return newState;
    }

    case GET_ONE_BOOKING: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...newState[action.payload.id],
        ...action.payload,
      };
      newState[action.payload.id] = action.payload;
      return newState;
    }

    case CREATE_BOOKING: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      // console.log('THIS IS THE NEWSTATE.PAYLOAD: ', newState.payload)
      return newState;
    }

    case UPDATE_BOOKING: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...newState[action.payload.id],
        ...action.payload,
      };
      return newState;
    }

    case DELETE_BOOKING: {
      const newState = { ...state };
      delete newState[action.payload]; // payload is the bookingId because we don't need data from deleteTHUNK(line 160)
      return newState;
    }

    default:
      return state;
  }
};

export default bookingsReducer;