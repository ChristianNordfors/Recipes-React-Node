import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../../actions/notification';

import './notification.css';

export default function Notification() {

    const { msg, show, type } = useSelector(state => state.notification);
    const dispatch = useDispatch();


    useEffect(() => {
        if (show) {
            setTimeout(() => {
                dispatch(hideNotification());
            }, 5000);
        }
    }, [show, dispatch]);


    return (<>
        {show && <p onClick={() => dispatch(hideNotification())} id="notification"  className={`notification ${type === 'danger' && 'notificationDanger'}`}>{msg}</p>}
    </>)
}