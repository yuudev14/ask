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
    console.log(data);
    return ( 
        <div className='comment'>
            <div>
                <Link to={`/U/${username}`}><p className='commenter'> - {username}</p></Link>
                {userInfo.username === username && (
                    <div><i onClick={() => deleteCommentDispatch(comment_id)}>. . .</i></div>

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