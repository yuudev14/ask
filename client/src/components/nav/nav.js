import {useRef, useState, useEffect} from 'react';
import '../../styles/nav.scss';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { resetUserInfo, setAuthToFalse } from "../../store/actions/authActions";
import AskQuestion from '../question/ask_question';
import LoginSignUp from './login_signup';
import ProfileOption from './profile_option';
import Notification from './notification';



const Nav = (props) => {

    const {auth} = props;
    const [searchInput, set_searchInput] = useState('');
    const [searchLists, set_searchLists] = useState([]);

    const notification = useRef();
    const notification_icon = useRef();
    const askForm = useRef();
    const showSearchContainer = () => {
        if(searchInput === ''){
            return ''
        }
        return 'showSearchContainer'
    };

    const search_questions = async() => {
        try {
            const getSearchLists = await axios.post('/dashboard/search', {search : searchInput});
            set_searchLists(getSearchLists.data);
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        if(searchInput !== ''){
            search_questions();

        }else{
            set_searchLists([])
        }

    }, [searchInput])
    
    return ( 
        <>

            <header>
                <AskQuestion askForm={askForm}/>
                <nav>
                    <Link to='/'><h1 >Ask</h1></Link>
                    <form>
                        <label htmlFor='search' className='fa fa-search'></label>
                        <input id='search' type='search' autoComplete='off' value={searchInput} onChange={(e) => set_searchInput(e.target.value)}/>
                        <div onClick={() => set_searchInput('')} className={`search-container ${showSearchContainer()}`}>
                            {searchLists.map(list => (
                                <Link to={`/${list.question.replace(/[\s]+/g, '-')}`}><h2>{list.question}</h2></Link>
                            ))}

                        </div>
                    </form>
                    {auth === false ? (
                        <LoginSignUp />
                    ) : (
                        <ProfileOption askForm={askForm} notification={notification} notification_icon={notification_icon}/> 
                    )}
                </nav>
            </header>
            {auth && (
                <Notification notification={notification} notification_icon={notification_icon}/>
            )}
            
        </>
     );
}

const mapStateToProps = (state) => {
    return{
        auth : state.auth,
        userInfo : state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        authToFalse : () => dispatch(setAuthToFalse()),
        resetUserInfo : () => dispatch(resetUserInfo())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Nav);