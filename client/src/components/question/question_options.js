import {useRef, useState} from 'react';
import { connect } from 'react-redux';
import { deleteQuestionList } from '../../store/actions/questionActions';
import { withRouter } from 'react-router-dom';

const QuestionOptions = (props) => {
    const {deleteQuestionList, id, filterQuestions} = props;

    const [deleteState, setDeleteState] = useState(false);
    const questionOption = useRef();

    const showQuestionOption = () => {
        questionOption.current.classList.toggle('hide_question_option')
    }

    const deleteQuestion = () => {
        deleteQuestionList(id);
        if(props.match.path === '/profile'){
            filterQuestions(id);
        }else{
            props.history.push('/')
        }

    }

    return ( 
        <>
            <i onClick = {showQuestionOption} className='fa fa-ellipsis-h'></i>
            <div ref={questionOption} className='question_option hide_question_option'>
                <ul>
                    {!deleteState ? (
                        <li onClick={() => setDeleteState(true)}>delete</li>

                    ): (
                        <>
                            <h3>Are you sure?</h3>
                            <li onClick={deleteQuestion}>Yes</li>
                            <li onClick={() => setDeleteState(false)}>No</li>
                        </>

                    )}
                    
                </ul>

            </div>
        </>
     );
}
 
const mapDispatchToProps =(dispatch) => {
    return {
        deleteQuestionList : (id) => dispatch(deleteQuestionList(id))
    }
}
export default connect(null, mapDispatchToProps)(withRouter(QuestionOptions));