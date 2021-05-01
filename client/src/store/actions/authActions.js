import axios from 'axios';
import { socket } from '../../socket';


export const checkIsAuth = () => {
    return async(dispatch) => {
        if(localStorage.getItem('ask_token')){
            try {
                const isVerify = await axios.get('/dashboard/verify-token',{headers : {token : JSON.parse(localStorage.getItem('ask_token'))}});
                if(isVerify.status === 200){
                    dispatch({type : 'SET_USER_INFO', data : isVerify.data});
                    dispatch({type : 'TRUE'});
                    socket.connect();
                    socket.emit('join_room', isVerify.data.username)
                }else{
                    dispatch({type : 'FALSE'});
                };
                
            } catch (err) {
                dispatch({type : 'FALSE'});
                console.log(err.response);
                
            }
  
  
        }else dispatch({type : 'FALSE'});

        

    }
}

export const setAuthToTrue = () => {
    return {
        type : 'TRUE'
    }
}

export const setAuthToFalse= () => {
    return {
        type : 'FALSE'
    }
}

export const resetUserInfo = () => {
    return {
        type : 'RESET_USER_INFO'
    }
}