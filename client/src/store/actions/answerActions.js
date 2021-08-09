import axios from 'axios';
const vote = async(dispatch, vote_type, answer_id) => {
    try {
        const vote_method = await axios.post(`/answer/${vote_type}/${answer_id}`,{},{headers : {token : JSON.parse(localStorage.getItem('ask_token'))}});
        dispatch({type : 'UPDATE_ANSWER', answer_id, data : vote_method.data.votes});
        
    } catch (error) {
        console.log(error);
        dispatch({
            type : 'ERROR_SET',
            error : `${error.response.data}, you should be log in to vote for answers`
        })
    }


}
export const answer_vote_up = (answer_id) => {
    return (dispatch) => {
        vote(dispatch, 'vote-up', answer_id);
    }
}

export const answer_vote_down = (answer_id) => {
    return (dispatch) => {
        vote(dispatch, 'vote-down', answer_id);
    }
}

export const add_comment = (comment, answer_id) => {
    return async(dispatch) => {
        try {
            const add_comment_method = await axios.post(`/answer/add-comment/${answer_id}`, {comment}, {headers : {token : JSON.parse(localStorage.getItem('ask_token'))}});
            dispatch({type: 'UPDATE_ANSWERS_COMMENT', data: add_comment_method.data, answer_id});
            
        } catch (error) {
            dispatch({
                type : 'ERROR_SET',
                error : `${error.response.data}, you should be log in to comment in answers`
            })
            
        }
    }
}

export const delete_answer = (answer_id) => {
    return async(dispatch) => {
        try {
            const deleteAnswerMethod = await axios.delete(`/answer/delete-answer/${answer_id}`, {headers : {token : JSON.parse(localStorage.getItem('ask_token'))}});
            if(deleteAnswerMethod.data === true){
                dispatch({type : 'FILTER_ANSWER', answer_id});

            }
            
        } catch (error) {
            console.log(error.response)
            
        }
    }
}

export const deleteAnswersCommentAction = (id) => {
    return async(dispatch) => {
        try {
            const deleteCommentMethod = await axios.delete(`/answer/delete-comment/${id}`, {headers : {token : JSON.parse(localStorage.getItem('ask_token'))}});
            console.log(deleteCommentMethod)
                dispatch({
                    type: 'DELETE_ANSWERS_COMMENT',
                    id,
                    answer_id : deleteCommentMethod.data
                })
            
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const view_comments = (answer_id) => {
    return async(dispatch) => {
        try {
            const comments = await axios.get(`/answer/view-comments/${answer_id}`);
            dispatch({type : 'VIEW COMMENTS', data : comments.data, answer_id});
            
        } catch (error) {
            console.log(error);
            
        }
    }
}