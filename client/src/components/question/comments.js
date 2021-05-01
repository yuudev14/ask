import {Link} from 'react-router-dom';
import { getDate } from '../../methods/date';

const Comment = (props) => {
    const {
        comment,
        username,
        date
    } = props.data;
    console.log(props.data)
    return ( 
        <div className='comment'>
            <Link to={`/U/${username}`}><p className='commenter'> - {username}</p></Link>
                <p className='date'>{getDate(date)}</p>
            <p>{comment}</p>
            
        </div>
     );
}
 
export default Comment;