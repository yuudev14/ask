import { Fragment } from "react";
import {withRouter, Link} from 'react-router-dom';
import OAuthBntn  from "./oAuth_button";


const SignupFirstStep = (props) => {
    const {sign_up_step2, set_register_form_method, registerForm} = props;
    

    
    return ( 
        <Fragment>
                <Link to='/'><h1>Ask</h1></Link>
                <p>sign up to ask and answer question</p>
                <form onSubmit={sign_up_step2}>
                    <label>
                        
                        <input type='email' value={registerForm.email} name='email' placeholder=' ' required onChange={set_register_form_method}/>
                        <p>Email</p>
                    </label>
                    
                    <input type='submit' value='next' />
                </form>
                {/* or
                <OAuthBntn  pathname={props.location.pathname}/> */}
               
                <p className='signup_warning'>By signing up, you agree to our Terms , Data Policy and Cookies Policy .</p>
                <p className='already_have'>Already have an account? <Link to='/login'>Log in</Link></p>
        </Fragment>
     );
}
 
export default withRouter(SignupFirstStep);