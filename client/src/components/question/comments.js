import {Link} from 'react-router-dom';
import { getDate } from '../../methods/date';
import { connect } from 'react-redux';
import { deleteAnswersCommentAction } from '../../store/actions/answerActions';

const Comment = (props) => {
    const {
        data,
        deleteCommentDispatch
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
                <div><i onClick={() => deleteCommentDispatch(comment_id)}>. . .</i></div>
            </div>
            <p className='date'>{getDate(date)}</p>
            <p>{comment}</p>
            
        </div>
     );
}

const mapDispatchToProps = dispatch => {
    return {
        deleteCommentDispatch : (comment_id) => dispatch(deleteAnswersCommentAction(comment_id)),
    }
}
 
export default connect(null, mapDispatchToProps)(Comment);