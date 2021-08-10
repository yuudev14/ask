import {Link} from 'react-router-dom';
import { getDate } from '../../methods/date';
import { connect } from 'react-redux';
import { deleteAnswersCommentAction } from '../../store/actions/answerActions';

const Comment = (props) => {
    const {
        data,
        deleteCommentDispatch,
        userInfo
    } = props;
    const {
        comment,
        username,
        date,
        comment_id
    } = data;
    return ( 
        <div className='comment'>
            <div className='comment_header'>
                <Link to={`/U/${username}`}><p className='commenter'> - {username}</p></Link>
                {userInfo.username === username && (
                    <i className='fa fa-trash' onClick={() => deleteCommentDispatch(comment_id)}></i>

                )}
                
            </div>
            <p className='date'>{getDate(date)}</p>
            <p>{comment}</p>
            
        </div>
     );
}

const mapStateToProps = state => {
    return {
        userInfo : state.user
    }
}
const mapDispatchToProps = dispatch => {
    return {
        deleteCommentDispatch : (comment_id) => dispatch(deleteAnswersCommentAction(comment_id)),
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Comment);