const initState = [];

const notificationReducer = (state = initState, action) => {
    switch(action.type){
        case 'SET_NOTIFICATION':
            return action.data
        case 'SET_NEW_NOTIFICATION':
            return [action.data, ...state]
        case 'SEEN_ALL_NOTIFICATION':
            const updatedNotification = [...state].map(notif => {
                notif.notif_status = 'SEEN'
                return notif
            })
            return updatedNotification
        default:
            return state;
    }
}

export default notificationReducer