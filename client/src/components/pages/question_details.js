import { Fragment, useCallback, useEffect, useState, memo, useRef } from "react";
import '../../styles/question_details.scss';
import Answer from "../question/answers";
import axios from 'axios';
import parse from 'html-react-parser';
import QuestionCatalogBTN from "../question/question_catalog";
import {connect} from 'react-redux';
import { getAnswers, getDetails, setDetails } from "../../store/actions/questionDetailActions";
import QuestionOptions from "../question/question_options";
import { setError } from "../../store/actions/errorAction";
import {useLocation} from 'react-router-dom';
import { getDate } from "../../methods/date";

const QuestionDetails = (props) => {
    const {question_details, getDetails, emptyDetails, setDetails, getAnswers, userInfo,
    setError} = props;
    const [currentQuestion, setCurrentQuestion] = useState('');
    const location = useLocation();
    console.log(location);
    const setupQuestionDetails = () => {
        const question_title = props.match.params.question
        getDetails(question_title);
        getAnswers(question_title);
        
        setCurrentQuestion(question_title);
        
    }
    useEffect(() => {
        setupQuestionDetails();
        return () => {
            emptyDetails();
        }
    }, []);

    useEffect(() => {
        if(currentQuestion !== props.match.params.question){
            setupQuestionDetails();
            const previousViewedQuestion = JSON.parse(localStorage.getItem('ask_previously_viewed'));
            if(previousViewedQuestion === null){
                const setPreviousQuestion = [props.match.params.question]
                localStorage.setItem('ask_previously_viewed', JSON.stringify(setPreviousQuestion))
            }else{ 
                if(previousViewedQuestion.includes(props.match.params.question)){
                    const indexToBeRemove = previousViewedQuestion.indexOf(props.match.params.question);
                    let NewPreviousViewedQuestion = [...previousViewedQuestion];
                    NewPreviousViewedQuestion.splice(indexToBeRemove, 1);
                    console.log(NewPreviousViewedQuestion)
                    localStorage.setItem('ask_previously_viewed', JSON.stringify([ props.match.params.question, ...NewPreviousViewedQuestion ]));
                }else{
                    if(previousViewedQuestion.length > 3){
                        localStorage.setItem('ask_previously_viewed', JSON.stringify([ props.match.params.question, ...previousViewedQuestion.slice(0, 3) ]));
                    }else{
                        localStorage.setItem('ask_previously_viewed', JSON.stringify([ props.match.params.question, ...previousViewedQuestion ]));
                    }

                }
                
            }
            axios.post(`/dashboard/view/${props.match.params.question}`);
            
        }
    });


    


    const vote_up = async() => {
        try {
            const updated_question_details = await axios.post(`/question/vote-up/${question_details.question_id}`,{},{headers : {token : JSON.parse(localStorage.getItem('ask_token'))}});
            setDetails(updated_question_details.data);
            
        } catch (error) {
            setError(`${error.response.data}. you should be log in to vote for questions`);
            
        }
        
    }
    const vote_down = async() => {
        try {
            const updated_question_details = await axios.post(`/question/vote-down/${question_details.question_id}`,{},{headers : {token : JSON.parse(localStorage.getItem('ask_token'))}});
            setDetails(updated_question_details.data)
            
        } catch (error) {
            setError(`${error.response.data}. you should be log in to answer questions`);
            
        }
       
    }
    
    return ( 
        <Fragment>
            <div className='question'>

                {userInfo.username === question_details.username && (
                    <QuestionOptions id={question_details.question_id}/>

                )}
                
                <div className='vote_catalog'>
                    <i className='fa fa-angle-up' onClick={vote_up}></i>
                    <p>{question_details.votes}</p>
                    <i className='fa fa-angle-down' onClick={vote_down}></i>

                </div>
                <div className='question_catalog'>
                    <div className='question_info1'>
                        <p>ask by <span className='user'>{question_details.username}</span></p>
                        <p className='date'>{getDate(question_details.date)}</p>

                    </div>
                    <h1>{question_details.question}</h1>
                    <p>{question_details.answers} answers</p>
                    <div className='popular_answer_and_context'>{parse(question_details.context || '')}</div>
                    <div className='question_info2'>
                        <ul className='question_tags'>
                            {question_details.tags && question_details.tags.map(tag => {
                                <li key={tag}>{tag}</li>

                            })}
                            

                        </ul>
                        <QuestionCatalogBTN id={question_details.question_id} title={question_details.question}/>
                    </div>

                </div>
            </div>
            <h1 className='answer_title'>Answers</h1>
            <section className='answers'>
                {question_details.answerLists.map(answer => (
                    <Answer key={answer.answer_id} answer={answer}/>

                ))}

            </section>
            

        </Fragment>
     );
}

const mapStateToProps = (state) => {
    return{
        question_details : state.questionDetails,
        userInfo : state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDetails : (question) => {dispatch(getDetails(question))},
        emptyDetails : () => {dispatch({type : 'EMPTY_DETAILS'})},
        setDetails : (data) => {dispatch(setDetails(data))},
        getAnswers : (question) => {dispatch(getAnswers(question))},
        setError : (error) => dispatch(setError(error)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(memo(QuestionDetails));