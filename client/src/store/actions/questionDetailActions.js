import axios from 'axios';
export const getDetails = (question) => {
    return async(dispatch) => {
        try {
            const details = await axios.get(`/dashboard/Q/${question}`);
            if(details.data !== null){
                dispatch({type : 'SET_DETAILS', data : details.data});
            }        
        } catch (error) {
            dispatch({type : 'EMPTY_DETAILS'});
            dispatch({type : 'ERROR_SET' , error : error.response.data});
            const previousViewedQuestion = JSON.parse(localStorage.getItem('ask_previously_viewed'))
                                                .filter(prev_question => prev_question !== question);
            localStorage.setItem('ask_previously_viewed', JSON.stringify(previousViewedQuestion));
            
        }
    }
}

export const getAnswers = (question) => {
    return async(dispatch) => {
        try {
            const answers = await axios.get(`/dashboard/Q-answers/${question}`);
            const data = answers.data.map(data => {
                data.comments = []
                return data
            });
            dispatch({type : 'SET_ANSWERS', data : answers.data});

            
        } catch (error) {
            console.log(error)
            
        }
    }
}


export const setDetails = (data) => {
    return {
        type : 'SET_DETAILS', 
        data
    }
}