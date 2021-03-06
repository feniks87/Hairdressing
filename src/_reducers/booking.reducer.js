import { bookingConstants } from '../_constants/booking.constants';

export function bookingInfo(state = {bookings: []}, action) {
    switch (action.type) {
        case bookingConstants.FETCH_BOOKINGS_REQUEST:
            return {
                ...state,
                fetching: true,
            };
        case bookingConstants.FETCH_BOOKINGS_SUCCESS:
            return {
                ...state,
                bookings: action.bookings,
                fetching: false
            };
        case bookingConstants.FETCH_BOOKINGS_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case bookingConstants.ADD_BOOKING_REQUEST:
            return {
                addingBooking: true,
                ...state,
            };
        case bookingConstants.ADD_BOOKING_SUCCESS:
            return {
                ...state,
                bookings: [...state.bookings, action.booking],
                addingBooking: false
            };
        case bookingConstants.ADD_BOOKING_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case bookingConstants.CANCEL_BOOKING_REQUEST:
            return {
                ...state,
            };
        case bookingConstants.CANCEL_BOOKING_SUCCESS:
            return {
                ...state,
                bookings: state.bookings.filter((b) => b.id !== action.bookingId)
            };
        case bookingConstants.CANCEL_BOOKING_FAILURE:
            return {
                ...state,
                error: action.error
            };
        default:
            return state
    }
}