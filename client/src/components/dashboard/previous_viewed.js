import {useEffect, useState} from 'react';
import {withRouter, Link} from 'react-router-dom';
import axios from 'axios'

const PreviousViewed = (props) => {
    const [previousViewedQuestion, setPreviousViewedQuestion] = useState([]);
    const [path, setPath] = useState('');
    useEffect(() => {
        (async() =>{
            if(path !== props.location.pathname){
                try {
                    const prev_question = JSON.parse(localStorage.getItem('ask_previously_viewed'));
                    if(prev_question !== null){
                        const questions = await axios.post('/dashboard/previously-viewed', prev_question);
                        setPreviousViewedQuestion(questions.data.filter(question => question !== null));
                        setPath(props.location.pathname)
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        })()
    }, [path, props.location.pathname]);

    return ( 
        <div className='previous_container' >
            <h1>Previously Viewed</h1>
            {previousViewedQuestion.map(question => 
                    <div key={question.question} className='previously_viewed_question'>
                    <Link to={`/${question.question.replace(/[\s]+/g, '-')}`}><h2>{question.question}</h2></Link>
                    <p>asked by <Link to={`/U/${question.username}`}><span>{question.username}</span></Link></p>

                </div>
            )}


        </div>
     );
}
 
export default withRouter(PreviousViewed);