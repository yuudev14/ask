export const updateToAnswerQuestion = (title) => {
    return {
        type : 'UPDATE_QUESTION_TO_ANSWER',
        data : title
    }
}