const initState = [];

const questionPostsReducer = (state = initState, action) => {
    switch(action.type){
        case 'SET_QUESTIONS':
            return [...state, ...action.questions];
        case 'INCREMENT_QUESTIONS_ANSWER':
            const question = [...state].map(question => {
                const newQuestion = {...question}
                if(newQuestion.question === action.question){
                    newQuestion.answers = (Number(newQuestion.answers) + 1).toString()
                }
                return newQuestion;
            })
            return [...question]
        case 'RESET_QUESTION_POSTS':
            return []
        default:
            return state;
    }
}

export default questionPostsReducer;