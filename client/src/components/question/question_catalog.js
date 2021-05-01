import { connect } from 'react-redux';
import { updateToAnswerQuestion } from '../../store/actions/toAnswerActions';

const QuestionCatalogBTN = (props) => {
    const {setToAnswerTitle, title, id} = props;
    const show_answer = () => {
        setToAnswerTitle({title, id})
        document.querySelector('.answer_form_container').classList.add('unhide_answer_form');
    }
    return ( 

        <button onClick={show_answer}>Answer</button>
     );
}

const mapDispatchToProps = (dispatch) => {
    return {
        setToAnswerTitle : (title) => {dispatch(updateToAnswerQuestion(title))}
    }
}
 
export default connect(null, mapDispatchToProps)(QuestionCatalogBTN);