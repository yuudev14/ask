const initState = ''

const toAnswerReducer = (state = initState, action) => {
    switch(action.type){
        case 'UPDATE_QUESTION_TO_ANSWER':
            return action.data

        case 'EMPTY':
            return ''
        default: return state
    }
}

export default toAnswerReducer