import '../../styles/ask_question_n_answer.scss';
import {useState, useRef, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { getMostViewedQuestions, getNewQuestions, getPopularQuestions } from "../../store/actions/questionActions";
import { setError } from "../../store/actions/errorAction";
import axios from 'axios';

const AskQuestion = (props) => {

    const {
        askForm,
        filterState, 
        getMostViewedQuestions, 
        getNewQuestions, 
        getPopularQuestions, 
        resetQuestionPosts,
        setError} = props;

    

    const [askQuestion, setAskQuestion] = useState({
        question : '',
        question_context : '',
        tags : []
    });

    const addTagInput = useRef();
    const closeAskForm =() => {
        askForm.current.classList.remove('unhide_ask_form');
    }

    const submitQuestion = async(question_form, path, filter) => {
        console.log(filter);
        try {
            const submitQuestionMethod = await axios.post('/question/submit-question', question_form, {headers : {token : JSON.parse(localStorage.getItem('ask_token'))}});
            
            if(submitQuestionMethod.data === true){
                resetQuestionPosts();
                
                if(path === '/'){
                    
                    switch(filter){
                        case 'popular':
                            getPopularQuestions(0, filter);
                            break;
                        case 'new':
                            getNewQuestions(0, filter);
                            break;
                        case 'most viewed':
                            getMostViewedQuestions(0, filter)
                            break;
                        default:
                            return []
                    }
                }else{
                    props.history.push('/');
                }
                closeAskForm();
            }
            setAskQuestion({
                question : '',
                question_context : '',
                tags : []
            });
            addTagInput.current.value = '';
            
            
        } catch (error) {
            setError(error.response.data);
        }
}

    const submitAskQuestion = (e) => {
        e.preventDefault();
        
        submitQuestion(askQuestion, props.match.path, filterState);
        
    }

    const setAskQuestionMethod = (e) => {
        setAskQuestion({
            ...askQuestion,
            [e.target.name] : e.target.value
        })
    }
    
    const setAskQuestionMethodContext = (e, editor) => {
        setAskQuestion({
            ...askQuestion,
            'question_context' : editor.getData()
        })

    }

    const onKeyUpAddTags = (e) => {
        addTagInput.current.style.width = e.target.value.length + 30 + 'px';
        if(e.key === 'Enter'){
            e.preventDefault();
            submitAddTags()
        }
    }

    const submitAddTags = () => {
        if(addTagInput.current.value !== ''){
            setAskQuestion({
                ...askQuestion,
                tags : [...askQuestion.tags, addTagInput.current.value]
            });
            addTagInput.current.value = ''
            addTagInput.current.style.width = '40px';

        }
        
        
    }

    const deleteTags = (index) => {
        const updatedTags = askQuestion.tags.filter((tag, i) => i !== index);
        setAskQuestion({
            ...askQuestion,
            tags : updatedTags
        });
    }

    return ( 
        <div className='ask_form_container' ref={askForm} style={{listStyleType: 'circle'}}>
            <form className = 'ask_form' onSubmit={submitAskQuestion}>
                <div className='ask_question_header'>
                    <i className='fa fa-close' onClick={closeAskForm}></i>
                    <input type='submit' />
                </div>
                <h1>Ask Your Question:</h1>
                <textarea name = 'question' onChange={setAskQuestionMethod} value={askQuestion.question} className='question_textarea' placeholder='"How many planets are there in our solar system"'></textarea>
                <h3>Add Context <span>(optional)</span></h3>
                <div className='question_context'>
                    <CKEditor 
                        data={askQuestion.question_context}
                        editor = {ClassicEditor}
                        onChange={setAskQuestionMethodContext}
                        name = 'question_context'
                        config={{         
                            toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'link', 'numberedList', 'bulletedList', '|', 'undo', 'redo'],
                            cssContent : '../../styles/ask_question_n_answer.scss'
                        }} 
                        
                        />
                </div>
               
                {/* <textarea   className='context_textarea' placeholder='"I think there are 9 planets but I dont know how many"'></textarea> */}
                <h3>Tags <span>(optional)</span></h3>
                <div className='list_of_tags'>
                    <ul className='list_container'>
                        {askQuestion.tags.length > 0 && askQuestion.tags.map((tag, i) => (
                            <li>
                                <i className='fa fa-close' onClick ={() => deleteTags(i)}></i>
                                <p>{tag}</p>
                            </li>

                        ))}
                        
                        
                        <li className='add_tags'>
                            <input ref={addTagInput} type='text' onKeyPress={onKeyUpAddTags} className='tag' />
                            <i className='fa fa-plus' onClick={submitAddTags}></i>
                        </li>
                    </ul>
                    

                </div>
            </form>
        </div>

     );
}
const mapStateToProps = (state) =>{
    return {
        filterState : state.filter,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getPopularQuestions : (start, filter) => {dispatch(getPopularQuestions(start, filter))},
        getNewQuestions : (start, filter) => {dispatch(getNewQuestions(start, filter))},
        getMostViewedQuestions : (start, filter) => {dispatch(getMostViewedQuestions(start, filter))},
        setError : (error) => dispatch(setError(error)),
        resetQuestionPosts : () => dispatch({type : 'RESET_QUESTION_POSTS'})
    }
}

 
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AskQuestion));