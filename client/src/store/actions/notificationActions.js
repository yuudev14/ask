import axios from 'axios';

export const getNotifications = () => {
    return async(dispatch) => {
        try {
            const notificationsData = await axios.get('/dashboard/notifications', {headers : {token : JSON.parse(localStorage.getItem('ask_token'))}});
            dispatch({type : 'SET_NOTIFICATION', data : notificationsData.data});
        } catch (error) {
            console.log(error);
            
        }

    }
}

export const set_new_notifications = (data) => {
    return{
        type : 'SET_NEW_NOTIFICATION',
        data
    }
}

export const seen_all_notifications = () => {
    return{
        type : 'SEEN_ALL_NOTIFICATION'
    }
}