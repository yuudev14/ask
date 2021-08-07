import {Link} from 'react-router-dom'
import '../../styles/login.scss';
import {useState, useContext} from 'react';
import axios from 'axios';
import OAuthBntn from "../auth/oAuth_button";
import {connect} from 'react-redux';
import { setAuthToTrue } from "../../store/actions/authActions";
import { setError } from "../../store/actions/errorAction";

const Login = (props) => {
    const [loginForm, setLoginForm] = useState({
        email : '',
        password : ''
    });
    const {authToTrue, setError} = props;

    const login = async(e) => {
        e.preventDefault();
        try {
            const signin_method = await axios.post('/authentication/login', loginForm);
            authToTrue();
            localStorage.setItem('ask_token', JSON.stringify(signin_method.data.token))
            props.history.push('/');
        } catch (error) {
            setError(error.response.data.error);
            
        }
        
    }
    const setLoginFormMethod = e => {
        setLoginForm({
            ...loginForm,
            [e.target.name] : e.target.value
        })
    }
    return ( 
        <div className='login_container'>
            <Link to='/'><h1>Ask</h1></Link>
            <p>login to ask and answer question</p>
            <form onSubmit={login}>
                <label>
                    <input type='email' placeholder=' ' required name='email' onChange={setLoginFormMethod}/>
                    <p>Email</p>
                </label>
                <label>
                    <input type='password' required name='password' autoComplete='off' placeholder=' ' onChange={setLoginFormMethod}/>
                    <p>Password</p>
                </label>
                <input type='submit' value='log-in' />
            </form>
            or
            <OAuthBntn pathname={props.location.pathname}/>

            <p className='already_have'>Don't have an account? <Link to='/sign-up'>Sign up</Link></p>
            
        </div>
     );
}

const mapDispatchToProps = (dispatch) => {
    return{
        authToTrue : () => dispatch(setAuthToTrue()),
        setError : (error) => dispatch(setError(error))
    }
}
 
export default connect(null, mapDispatchToProps)(Login);