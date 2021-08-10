import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useRef, useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import '../../styles/ask_question_n_answer.scss';
import {withRouter} from 'react-router-dom';
import { increment_questions_answer } from "../../store/actions/questionActions";
import { getAnswers, getDetails } from '../../store/actions/questionDetailActions';
import {socket} from '../../socket';
import { setError } from '../../store/actions/errorAction';


const AnswerQuestion = (props) => {
    const {title, 
           filterState, 
           getDetails, 
           getAnswers,
           userInfo,
           setError,
           increment_questions_answer
        } = props;
    const answer_form_container = useRef();
    const [answer, setAnswer] = useState('');
    const close_answer = () => {
        answer_form_container.current.classList.remove('unhide_answer_form');
    }

    const submit_answer_method = async(data, path, filter) => {
        try {
            
            const submit_answer_request = await axios.post('/question/answer-question', data, {headers : 
                                                                                            {token : JSON.parse(localStorage.getItem('ask_token'))}});
            if(submit_answer_request.data){
                if(path === '/'){
                    // switch(filter){
                    //     case 'popular':
                    //         getPopularQuestions();
                    //         break;
                    //     case 'new':
                    //         getNewQuestions();
                    //         break;
                    //     case 'most viewed':
                    //         getMostViewedQuestions()
                    //         break;
                    // }
                    increment_questions_answer(title.title);
                }else{
                    const question = title.title.replace(/[\s]+/g, '-')
                    getDetails(question);
                    getAnswers(question);
                }
                if(submit_answer_request.data.account_id !== userInfo.user_id){
                    socket.emit('answer_question', {...submit_answer_request.data, sender_id : userInfo.user_id, profile_pic : userInfo.profile_pic});
                }
            }
            setAnswer('')
        } catch (error) {
            setError(`${error.response.data}. you should be log in to answer questions`);
            
        }
    }

    const submit_answer = async(e) => {
        e.preventDefault();
        const data = {question_id : title.id,
            answer}
        submit_answer_method(data, props.match.path, filterState);
        close_answer();
        
    }
    return ( 
        <div className='answer_form_container' ref={answer_form_container}>
            <form className='answer_form' onSubmit={submit_answer}>
                <div className='ask_question_header'>
                    <i className='fa fa-close' onClick={close_answer} ></i>
                    <input type='submit' />
                </div>
                <h1>{title.title}</h1>
                <CKEditor 
                    data={answer}
                    editor = {ClassicEditor}
                    onChange={(e, editor) => setAnswer(editor.getData())}
                    name = 'answer'
                    config={{         
                        toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'link', 'numberedList', 'bulletedList', '|', 'undo', 'redo']
                    }} 
                    
                    />
            </form>
        </div>
     );
}
 
const mapStateToProps = (state) => {
    return {
        title : state.toAnswer,
        filterState : state.filter,
        userInfo : state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        increment_questions_answer : (question) => dispatch(increment_questions_answer(question)),
        getDetails : (question) => {dispatch(getDetails(question))},
        getAnswers : (question) => {dispatch(getAnswers(question))},
        setError : (error) => dispatch(setError(error))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AnswerQuestion));