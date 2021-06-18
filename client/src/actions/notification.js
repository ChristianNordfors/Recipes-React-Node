import { HIDE_NOTIFICATION, SHOW_NOTIFICATION } from "./types";

export function showNotification(msg, type = 'success') {

    const data = {
        msg,
        type
    }
    
    return function(dispatch) {
        dispatch({ type: SHOW_NOTIFICATION, payload: data });
    }
}

export function hideNotification() {
    return function(dispatch) {
        dispatch({ type: HIDE_NOTIFICATION, payload: false });
    }
}
