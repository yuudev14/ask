import { Fragment, useState, useEffect, useRef } from "react";
import axios from 'axios';
import Questions from "../question/questions";
import {connect}  from 'react-redux';
import {Redirect, useHistory} from 'react-router-dom';
import { setError } from "../../store/actions/errorAction";

const UserDashboard = (props) => {
    const [url, setUrl] = useState('');
    const {userInfo, auth, setError} = props;
    const history = useHistory();
    const [profileInfo, setProfileInfo] = useState({
        username: '',
        first_name: '',
        last_name: ''
    });
    const [usersQuestionList, setUsersQuestionList] = useState([]);
    const filter_options = useRef();

    const filterQuestions = (id) => {
        const updatedQuestion = usersQuestionList.filter(question => question.question_id !== id);
        setUsersQuestionList(updatedQuestion);

    }

    const change_filter_options = async(e) => {
        const lists = [...filter_options.current.getElementsByTagName('li')];
        lists.forEach(li => li === e.target ? li.classList.add('view') : li.classList.remove('view'));
        if(props.match.path == '/profile'){
            switch(e.target.id){
                case 'popular':   
                    const popular_questionList = await axios.get('/dashboard/user-popular', {headers : {token : JSON.parse(localStorage.getItem('ask_token'))}});
                    setUsersQuestionList(popular_questionList.data);
                    break;
                case 'most_viewed':
                    const most_viewed_questionList = await axios.get('/dashboard/user-most-viewed', {headers : {token : JSON.parse(localStorage.getItem('ask_token'))}});
                    setUsersQuestionList(most_viewed_questionList.data);
                    
                    break;
                case 'new':
                    const new_questionList = await axios.get('/dashboard/user-new', {headers : {token : JSON.parse(localStorage.getItem('ask_token'))}});
                    setUsersQuestionList(new_questionList.data);
                    
                    break;
                default :
                    return []
            }

        }else{
            switch(e.target.id){
                case 'popular':   
                    const popular_questionList = await axios.get(`/dashboard/profile-popular/${props.match.params.username}`);
                    setUsersQuestionList(popular_questionList.data);
                    break;
                case 'most_viewed':
                    const most_viewed_questionList = await axios.get(`/dashboard/profile-most-viewed/${props.match.params.username}`);
                    setUsersQuestionList(most_viewed_questionList.data);
                    
                    break;
                case 'new':
                    const new_questionList = await axios.get(`/dashboard/profile-new/${props.match.params.username}`);
                    setUsersQuestionList(new_questionList.data);
                    
                    break;
                default :
                    return []
            }

        }
        
        
    }
    const getProfileQuestionLists = async() => {
        try {
            const questionList = await axios.get('/dashboard/user-popular', {headers : {token : JSON.parse(localStorage.getItem('ask_token'))}});
            setUsersQuestionList(questionList.data);
        } catch (error) {
            console.log(error)
            
        }
    }
    const getUsersQuestionLists = async() => {
        try {
            const questionList = await axios.get(`/dashboard/profile-popular/${props.match.params.username}`);
            setUsersQuestionList(questionList.data);
        } catch (error) {
            console.log(error)
            
        }
    }
    const getProfileInfo = async() => {
        try {
            const profile = await axios.get(`/dashboard/profile-info/${props.match.params.username}`);
            setProfileInfo(profile.data);
            
        } catch (error) {
            setError(error.response.data);
            history.push('/');

            
            
        }
    }
    useEffect(() => {
        if(url !== props.match.url){

            if(props.match.path === '/profile'){
                if(auth === false){
                    props.history.push('/');
                    setError('you are not authenticated to access this site. Please log in')
                }else{
                    getProfileQuestionLists();
                }
                
            }else{
                    getProfileInfo();
                    getUsersQuestionLists();
                    
                
            }
            setUrl(props.match.url);
        } 
    });

    const date = () => {
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
                        'Sept', 'Oct', 'Nov', 'Dec'];
        let date;
        if(props.match.path === '/profile'){
            date = new Date(userInfo.date);
           
        }else{
            date = new Date(profileInfo.date);
        }
        return `${month[date.getMonth()]} ${date.getDate()}`
    }
    console.log(date())
    return ( 
        <Fragment>
            {props.match.params.username === userInfo.username && (
                    <Redirect to='/profile' />
                )}
            <div className='user_profile'>
                <div className='user_info'>
                    <div className='user_image'>
                        <img src={props.match.path == '/profile' ? userInfo.profile_pic : profileInfo.profile_pic} />
                    </div>
                    <div className='user_name'>
                        <h1>{props.match.path == '/profile' ? userInfo.first_name : profileInfo.first_name} {props.match.path == '/profile' ? userInfo.last_name : profileInfo.last_name}</h1>
                        <h3>{props.match.path == '/profile' ? userInfo.username : profileInfo.username}</h3>
                    </div>
                    {props.match.path == '/profile' && (
                        <button>Edit Profile</button>
                    )}
                    
                </div>
                <p>Joined {date()}</p>

            </div>
           
            <ul className='filter_options' ref={filter_options}>
                <li id='popular' onClick={change_filter_options} className='view'>Popular</li>
                <li id='most_viewed' onClick={change_filter_options}>Most Viewed</li>
                <li id='new' onClick={change_filter_options}>New</li>
            </ul>
            
            {usersQuestionList.map(question => (
                <Questions key={question.question_id} data={question} filterQuestions={filterQuestions}/>
            ))}

        </Fragment>
     );
}
 const mapStateToProps = (state) => {
     return{
         userInfo : state.user,
         auth : state.auth
     }
 }

 const mapDispatchToProps = (dispatch) => {
     return{
         setError : (error) => dispatch(setError(error))
     }

 }
export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);