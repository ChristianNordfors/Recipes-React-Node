import { HIDE_NOTIFICATION, SHOW_NOTIFICATION } from "../actions/types";

const initialState = {
    msg: '',
    show: false,
    type: ''
}


export default function notificationRedudcer(state = initialState, action) {
    switch (action.type) {
        case SHOW_NOTIFICATION:
            return {
                ...state,
                show: true,
                msg: action.payload.msg,
                type: action.payload.type
            };
        case HIDE_NOTIFICATION:
            return {
                ...state,
                show: false,
                msg: '',
                type: ''
            };

        default:
            return state;
    }
};