import React, {useRef} from 'react';
import '../../styles/question.scss';
import {Link, withRouter} from 'react-router-dom';
import QuestionCatalogBTN from './question_catalog';
import { connect } from 'react-redux';
import QuestionOptions from './question_options';
import { getDate } from '../../methods/date';
import parse from 'html-react-parser';

const Questions = (props) => {
    const {data, userInfo, filterQuestions} = props;
    const {answers, votes, question_views, question, tags, username, question_id, date, context} = data;
    

    
    return ( 
        <div className='question'>
            {userInfo.username === username && props.match.path === '/profile' && (
                <QuestionOptions filterQuestions={filterQuestions} id={question_id}/>

            )}


            
            
            <div className='info_catalog'>
                <h2>{votes}</h2>
                <p>votes</p>
                <h2>{answers}</h2>
                <p>answers</p>
                <h2>{question_views}</h2>
                <p>views</p>

            </div>
            <div className='question_catalog'>
                <div className='question_info1'>
                    
                    <p>ask by <Link to={`/U/${username}`}><span className='user'>{username}</span></Link></p>
                    <p className='date'>{getDate(date)}</p>

                </div>
                <Link to={`/${question.replace(/[\s]+/g, '-')}`}><h1>{question}</h1></Link>
                <div className='question_context'>
                    {parse(context)}
                    <div className='fade'></div>
                </div>
                
                
                <div className='question_info2'>
                    <ul className='question_tags'>
                        {tags.map(tag => (
                            <li>{tag}</li>
                        ))}

                    </ul>
                    <QuestionCatalogBTN id={question_id} title={question}/>
                </div>

            </div>
        </div>
     );
}
 
const mapStateToProps = (state) => {
    return {
        userInfo : state.user
    }
}
export default connect(mapStateToProps)(withRouter(Questions));