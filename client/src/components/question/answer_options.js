import {useRef, useState} from 'react';
import { connect } from 'react-redux';
import { delete_answer } from '../../store/actions/answerActions';

const AnswerOptions = (props) => {
    const {
        setEditStateToTrue, 
        setEditStateToFalse, 
        editState, 
        answer_id,
        delete_answer
    } = props;
    const [deleteState, setDeleteState] = useState(false);
    
    const answerOption = useRef();

    const showAnswerOption = () => {
        answerOption.current.classList.toggle('hide_answer_option');
    }

    const deleteAnswer = () => {
        delete_answer(answer_id);


    }


    return ( 
        <>
            <i className='fa fa-ellipsis-h' onClick={showAnswerOption}></i>
            <div ref={answerOption} className='answer_option hide_answer_option'>
                <ul>
                    {!deleteState ? editState ? (
                        <li onClick={setEditStateToFalse}>Cancel</li>
                    ) : (
                        <>
                            <li onClick={setEditStateToTrue}>edit</li>
                            <li onClick={() => setDeleteState(true)}>delete</li>
                        </>
                    ) : (
                        <>
                            <h3>Are you sure?</h3>
                            <li onClick={deleteAnswer}>Yes</li>
                            <li onClick={() => setDeleteState(false)}>No</li>
                        </>
                    )}
                    
                </ul>
            </div>
        </>
     );
}

const mapDispatchToProps = (dispatch) => {
    return {
        delete_answer : (id) => dispatch(delete_answer(id))
    }
}
 

export default connect(null, mapDispatchToProps)(AnswerOptions);