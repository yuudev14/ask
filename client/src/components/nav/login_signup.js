import {useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';

const LoginSignUp = () => {
    const login_signup_options = useRef();
    const login_signup = useRef();

    const show_login_signup = () => {
        login_signup_options.current.classList.toggle('hide');

    }
    // useEffect(() => {
    //     login_signup_options.current.style.left = login_signup.current.offsetLeft - 70 + 'px';
    // })
    // window.onresize = () => {
    //     login_signup_options.current.style.left = login_signup.current.offsetLeft - 70 + 'px';
    // }

    
    return ( 
        <>
            <div ref={login_signup} className='login_signup' onClick={show_login_signup}>
                <i className='fa fa-user'></i>
                <i className='fa fa-angle-down'></i>

            </div>
            <ul ref={login_signup_options} className='login_signup_options hide'>

                <Link to='/login'><li>log-in</li></Link>
                <Link to='/sign-up'><li>sign-up</li></Link>   
            </ul>
        </>
     );
}
 
export default LoginSignUp;