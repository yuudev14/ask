import { Fragment, useRef, useEffect, memo } from "react";
import Questions from "../question/questions";
import { connect } from 'react-redux';
import { getMostViewedQuestions, getNewQuestions, getPopularQuestions } from "../../store/actions/questionActions";

const HomeDashboard = (props) => {
    const {
        questions_posts,
        getPopularQuestions, 
        getNewQuestions, 
        getMostViewedQuestions, 
        filter, 
        resetFilter, 
        resetQuestionPosts} = props;
    const filter_options = useRef();


    const change_filter_options = async(e) => {
        const lists = [...filter_options.current.getElementsByTagName('li')];
        lists.forEach(li => li === e.target ? li.classList.add('view') : li.classList.remove('view'));
        

        switch(e.target.id){
            case 'popular':
                if(filter !== 'popular'){
                    resetQuestionPosts();
                    getPopularQuestions(questions_posts.length, filter);
                }
                
                break;
            case 'most_viewed':
                if(filter !== 'most viewed'){
                    resetQuestionPosts();
                    getMostViewedQuestions(questions_posts.length, filter);
                }
                break;
            case 'new':
                if(filter !== 'new'){
                    resetQuestionPosts();
                    getNewQuestions(questions_posts.length, filter);
                } 
                break;
            default :
                return []
        }
    }

    useEffect(() => {
        getPopularQuestions(questions_posts.length, filter);
        return () => {
            resetFilter();
            resetQuestionPosts();
        }

    }, []);

      window.onscroll = function(ev) {
        
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && questions_posts.length > 0) {
            console.log(true)
            
            switch(filter){
                case 'popular':
                    if(filter !== 'popular'){
                        resetQuestionPosts()
                    }
                    getPopularQuestions(questions_posts.length, filter);
                    break;
                case 'most viewed':
                    if(filter !== 'most viewed'){
                        resetQuestionPosts()
                    }
                    getMostViewedQuestions(questions_posts.length, filter);
                    break;
                case 'new':
                    if(filter !== 'new'){
                        resetQuestionPosts()
                    }
                    getNewQuestions(questions_posts.length, filter);
                    break;
                default :
                    return []
            }
            
            
           
        }
    };

    return ( 
        <Fragment>
                <ul className='filter_options' ref={filter_options}>
                    <li id='popular' onClick={change_filter_options} className='view'>Popular</li>
                    <li id='most_viewed' onClick={change_filter_options}>Most Viewed</li>
                    <li id='new' onClick={change_filter_options}>New</li>

                </ul>
                {questions_posts.map(question => (
                    <Questions key={question.question_id} data={question}/>
                ))}
        </Fragment>
     );
}

const mapStateToProps = (state) => {
    return {
        questions_posts : state.questions,
        filter : state.filter,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPopularQuestions : (start, filter) => {dispatch(getPopularQuestions(start, filter))},
        getNewQuestions : (start, filter) => {dispatch(getNewQuestions(start, filter))},
        getMostViewedQuestions : (start, filter) => {dispatch(getMostViewedQuestions(start, filter))},
        resetFilter : () => dispatch({type : 'POPULAR'}),
        resetQuestionPosts : () => dispatch({type : 'RESET_QUESTION_POSTS'})
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(memo(HomeDashboard));