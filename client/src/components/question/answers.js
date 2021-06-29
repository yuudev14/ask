import Comment from './comments';
import React, {useRef, useState} from 'react';
import parse from 'html-react-parser';
import { add_comment, answer_vote_down, answer_vote_up, view_comments } from '../../store/actions/answerActions';
import { connect } from 'react-redux';
import AnswerOptions from './answer_options';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Link} from 'react-router-dom';
import { getDate } from '../../methods/date';

const Answer = (props) => {
    const {answer,
           votes, 
           no_comment, 
           question_id, 
           answer_id,
           comments,
           username,
           date
           } = props.answer;
    const {answer_vote_up, 
        answer_vote_down,
        add_comment,
        view_comments,
        comment,
        userInfo} = props;

    const answer_comments = useRef();
    const comment_form = useRef();

    const [viewCommentState, setViewCommnentState] = useState(false);
    const [commentInput, setCommentInput] = useState('');
    const [editState, setEditState] = useState(false);

    const viewComments = () => {
        answer_comments.current.classList.toggle('display_comments');
        comment_form.current.classList.toggle('show_comment_form');
        if(!viewCommentState){
            view_comments(answer_id)
        }
        
        setViewCommnentState(!viewCommentState);
    }
    const vote_up = () => {
        answer_vote_up(answer_id);
    }
    const vote_down = () => {
        answer_vote_down(answer_id);
    }
    const commentSubmit = (e) => {
        e.preventDefault();
        add_comment(commentInput, answer_id);
        setCommentInput('');
    }

    const setEditStateToTrue = () => {
        setEditState(true);
    }

    const setEditStateToFalse = () => {
        setEditState(false);
    }

    return ( 
        <div className='answer_container'>
            {userInfo.username === username && (
                <AnswerOptions 
                    setEditStateToTrue={setEditStateToTrue}
                    setEditStateToFalse={setEditStateToFalse}
                    editState={editState}
                    answer_id={answer_id}
                    />

            )}
           
            
            
            <div className='like_dislike'>
                <i className='fa fa-angle-up' onClick={vote_up}></i>
                <p>{votes}</p>
                <i className='fa fa-angle-down' onClick={vote_down}></i>
            </div>
            <div className='answer'>
                <div className='user_info'>
                    <div className='user_image'></div>
                    <div className='user_name_date'>
                        <Link to={`/U/${username}`}><h4>{username}</h4></Link>
                        <p>{getDate(date)}</p>
                    </div>
                    
                </div>
                <div className='answer_content'>
                    {!editState ? parse(answer || '') : (
                        <form class='editAnswerForm'>
                            <CKEditor 
                            data={answer}
                            editor = {ClassicEditor}
                            // onChange={editedAnswer}
                            config={{         
                                toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'link', 'numberedList', 'bulletedList', '|', 'undo', 'redo'],
                                cssContent : '../../styles/ask_question_n_answer.scss'
                            }} 
                            
                            />
                            <input type='submit' />

                        </form>
                        
                    )}
                </div>
                
                
                <div className='answer_comments' >
                    
                    {viewCommentState ? (
                        <p onClick={viewComments} className='comment_btn'>hide comments</p>
                    ) : (
                        <p onClick={viewComments} className='comment_btn'>view comments</p>
                    )}
                    
                    <form ref={comment_form} onSubmit={commentSubmit}>
                            <input type='text' 
                                placeholder='write a comment'
                                value={commentInput} 
                                onChange={(e) => setCommentInput(e.target.value)} />
                            <input type='submit' value='send'/>
                    </form>
                    
                    <div className='comments_container' ref={answer_comments}>
                    {comments.map(comment => (
                                <Comment data={comment}/>
                            ))}
                    {comments.length === 0 && (
                        <p>no comments</p>
                    )} 
                    </div>
                </div>

            </div>

        </div>
     );
}
const mapStateToProps = (state, prevState) => {
    const comments = state.questionDetails.answerLists.filter(answer => answer.answer_id === prevState.answer.answer_id)[0].comments;
    console.log(comments);
    return{
        comment : comments,
        userInfo : state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        answer_vote_up : (answer_id) => {dispatch(answer_vote_up(answer_id))},
        answer_vote_down : (answer_id) => {dispatch(answer_vote_down(answer_id))},
        add_comment : (comment, answer_id) => {dispatch(add_comment(comment, answer_id))},
        view_comments : (answer_id) => {dispatch(view_comments(answer_id))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Answer);