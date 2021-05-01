import WithNav from '../../hoc/withNav';
import '../../styles/signup.scss';
import React, {useRef, useState, useEffect, useContext} from 'react';
import axios from 'axios';
import SignupFirstStep from '../auth/signup_first_step';
import SignupSecondStep from '../auth/signup_second_step';
import {connect} from 'react-redux';
import { checkIsAuth} from "../../store/actions/authActions";
import { setError } from '../../store/actions/errorAction';

const Signup = (props) => {
    const step1 = useRef();
    const step2 = useRef();
    const {authToTrue, setError} = props;
    const [registerForm, setRegisterForm] = useState({
        email : '',
        first_name : '',
        last_name : '',
        password : '',
        username : '',
    });
    const register = async(e) => {
        e.preventDefault();
        try {
            const register_action = await axios.post('/authentication/register', registerForm);
            localStorage.setItem('ask_token', JSON.stringify(register_action.data.token));
            authToTrue()
            props.history.push('/');

        } catch (err) {
            setError(err.response.data);
            
        }

    }
    const sign_up_step2 = async(e) => {
        try {
            e.preventDefault();
            const isEmailExist = await axios.post('/authentication/is-email-exist', {email : registerForm.email, type : 'app_email'});
            if(isEmailExist.data){
                setError('Email already acquired. Try again.')
                
                

            }else{
                step2.current.classList.add('show_sign_up_step');
                step1.current.classList.remove('show_sign_up_step');
            }
            
        } catch (error) {
            console.log(error.response.data);
            
        }
        
    }

    const back_to_step1 = () => {
        step1.current.classList.add('show_sign_up_step');
        step2.current.classList.remove('show_sign_up_step');

    }

    const set_register_form_method = (e) => {
        setRegisterForm({
            ...registerForm,
            [e.target.name] : e.target.value
        })

    }

    
    return ( 
        <div className='sign_up_container'>
            <div className='why_sign_up'>
                <h1>Join the Ask Community</h1>
                <ul>
                    <li>
                        <i className='fa fa-question-circle'></i>
                        <p>Stuck? ask a question.</p>
                    </li>
                    <li>
                        <i className='fa fa-cloud'></i>
                        <p>Know something? answer some problems</p>
                    </li>
                    <li>
                        <i className='fa fa-lightbulb-o'></i>
                        <p>Share your ideas to people.</p>
                    </li>
                    <li>
                        <i className='fa fa-users'></i>
                        <p>Interact with everyone.</p>
                    </li>
                </ul>
            </div>
            <div className='sign_up_form show_sign_up_step' ref={step1}>
                <SignupFirstStep 
                    registerForm={registerForm}
                    sign_up_step2={sign_up_step2} 
                    set_register_form_method={set_register_form_method}/>
            </div>
            <div className='sign_up_next' ref={step2}>
                <SignupSecondStep 
                    registerForm={registerForm}
                    back_to_step1={back_to_step1} 
                    set_register_form_method={set_register_form_method} 
                    register={register}/>
                
            </div>

        </div>
     );
}

const mapDispatchToProps = (dispatch) => {
    return{
        authToTrue : () => dispatch(checkIsAuth()),
        setError : (error) => dispatch(setError(error))
    }
}
 
export default connect(null, mapDispatchToProps)(Signup);