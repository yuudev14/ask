
const initState = null;

const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'TRUE':  
            return true;
            
        case 'FALSE':
            return false;
        default:
            return state
    }
    

}

export default authReducer;