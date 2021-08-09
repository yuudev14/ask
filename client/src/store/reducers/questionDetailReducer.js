
const initState = {
    answerLists : []
}


const questionDetailReducer = (state = initState, action) => {
    switch(action.type){
        case 'SET_DETAILS' : 
            return {
                ...state,
                ...action.data,
            };
        case 'EMPTY_DETAILS' : 
            return {
                answerLists : []
            }
        case 'SET_ANSWERS' :
            return {
                ...state,
                answerLists : action.data,
            };
        case 'FILTER_ANSWER' :
            const filteredAnswer = state.answerLists.filter(ans => ans.answer_id !== action.answer_id);
            return {
                ...state,
                answerLists : [...filteredAnswer]
            }

        case 'UPDATE_ANSWER' :
            const updatedAnswers = state.answerLists.map(answer => {
                if(answer.answer_id === action.answer_id){
                    answer.votes = action.data
                    answer.comments = [...answer.comments]
                }
                return answer
            });
            return {
                ...state,
                answerLists : updatedAnswers
            }
        case 'UPDATE_ANSWERS_COMMENT' :
            const updatedAnswersComments = state.answerLists.map(answer => {
                if(answer.answer_id === action.answer_id){
                    answer.comments = [action.data, ...answer.comments]
                }
                return answer;
            });
            return {
                ...state,
                answerLists : updatedAnswersComments
            }

        case 'DELETE_ANSWERS_COMMENT' :
            const answersLists = [ ...state.answerLists.map(answer => {
                if(answer.answer_id === action.answer_id){
                    answer.comments = [...answer.comments.filter(comment => comment.comment_id !== action.id)]
                }
                return answer;
            })]
            
            return {
                ...state,
                answersLists
                
            }
        case 'VIEW COMMENTS' :
            const viewCommentsData = state.answerLists.map(answer => {
                if(answer.answer_id === action.answer_id){
                    answer.comments = action.data
                }
                return answer;
            });
            return {
                ...state,
                answerLists : viewCommentsData
            }
        default : 
            return state;
    }
    
}

export default questionDetailReducer;