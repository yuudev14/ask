import axios from 'axios';


const getListOfQuesionsPosts = async(url, dispatch) => {
    try {
        
        const Questions = await axios.get(url);
        
        if(Questions.data.length !== 0) dispatch({type : 'SET_QUESTIONS', questions : Questions.data});
        
    } catch (error) {
        console.log(error);
        
    }
}

export const increment_questions_answer = (question) => {
    return {
        type : 'INCREMENT_QUESTIONS_ANSWER',
        question
    }
} 

export const getPopularQuestions = (start, filter) => {
    return (dispatch) => {
        dispatch({type : 'POPULAR'});
        getListOfQuesionsPosts(`/dashboard/popular-questions/${filter === 'popular' ? start : 0}`, dispatch);
        
        
    }
}

export const getNewQuestions = (start, filter) => {
    return (dispatch) => {
        dispatch({type : 'NEW'});
        getListOfQuesionsPosts(`/dashboard/new-questions/${filter === 'new' ? start : 0}`, dispatch);
        
    }
}

export const getMostViewedQuestions = (start, filter) => {
    return (dispatch) => {
        dispatch({type : 'MOST_VIEWED'})
        getListOfQuesionsPosts(`/dashboard/most-viewed-questions/${filter === 'most viewed' ? start : 0}`, dispatch);
        
    }
}
export const deleteQuestionList = (id) => {
    return async(dispatch) => {
        try {
            await axios.delete(`/question/delete/${id}`)
            
        } catch (error) {
            console.log(error)
            
        }

    }
}
