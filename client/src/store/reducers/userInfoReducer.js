const initState = {}

const userInfoReducer = (state = initState, action) => {
    switch(action.type){
        case 'SET_USER_INFO':
            return action.data;
        case 'RESET_USER_INFO':
            return {};
        default: return state;
    }
}
export default userInfoReducer;