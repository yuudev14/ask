const initState = '';


const errorReducer = (state = initState, action) => {
    switch(action.type){
        case 'ERROR_SET':
            document.querySelector('.error').classList.add('error_animate');
            document.querySelector('.error_time').classList.add('error_time_animate');

            setTimeout(() => {
                document.querySelector('.error').classList.remove('error_animate');
                document.querySelector('.error_time').classList.remove('error_time_animate');

            }, 3000)
            return action.error;
        default: 
            return state;
    }
}

export default errorReducer;