import { csrfFetch } from "./csrf";

// CREATE | POST
const CREATE_BOOKING = "bookings/createBooking";

// READ | GET
const GET_SPOT_BOOKINGS = "bookings/getSpotBookings";
const GET_USER_BOOKINGS = "bookings/getUserBookings";

// UPDATE | PUT
const UPDATE_BOOKING = "bookings/updateBooking";

// DELETE
const DELETE_BOOKING = "bookings/deleteBooking";

// ACTIONS | CREATE
const createBookingAction = (payload) => {
  return {
    type: CREATE_BOOKING,
    payload,
  };
};

// ACTIONS | READ | GET
const getSpotBookingsAction = (payload) => {
  return {
    type: GET_SPOT_BOOKINGS,
    payload,
  };
};

const getUserBookingsAction = (payload) => {
  return {
    type: GET_USER_BOOKINGS,
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
export const createBookingThunk = (payload, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createBookingAction(data));
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
export const getSpotBookingsThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getSpotBookingsAction(data));
    return data;
  }
};

export const getUserBookingsThunk = () => async (dispatch) => {
  const response = await csrfFetch("api/bookings/current");

  if (response.ok) {
    const data = await response.json();
    dispatch(getUserBookingsAction(data));
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
  }
};

// REDUCER
let initialState = {};

const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOT_BOOKINGS: {
      const newState = { ...state };
      action.payload.Bookings.forEach((booking) => {
        newState[booking.id] = booking;
      });
      return newState;
    }

    case GET_USER_BOOKINGS: {
      const newState = { ...state };
      action.payload.Bookings.forEach((booking) => {
        newState[booking.id] = booking;
      });
      return newState;
    }

    case CREATE_BOOKING: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
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