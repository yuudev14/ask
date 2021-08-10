import { Fragment, memo } from "react";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { connect } from 'react-redux';
import { checkIsAuth } from "../../store/actions/authActions";
import { withRouter } from 'react-router-dom';

const OAuthBntn = (props) => {
    const {pathname, authToTrue} = props
    const oAuth = async(data) => {
        try {
            const register_action = await axios.post('/authentication/oAuth', data);
            localStorage.setItem('ask_token', JSON.stringify(register_action.data.token));
            authToTrue()
            props.history.push('/');

        } catch (err) {
            throw err
            
        }
    }
    const responseFacebook = async(response) => {
        if(response.status !== 'unknown'){
            const name = response.name.split(' ');
            const data = {
                first_name : name[0],
                last_name : name[1],
                email : response.email,
                profile_pic : response.picture.data.url,
                type : 'facebook',
                password : response.id

            }
            oAuth(data);
        }

        
    }

    const responseGoogle = response => {
        
        const data = {
            first_name : response.profileObj.givenName,
            last_name : response.profileObj.familyName,
            email : response.profileObj.email,
            profile_pic : response.profileObj.imageUrl,
            password : response.googleId,
            type : 'google'
        }
        oAuth(data);
    }
    return ( 
        <Fragment>
             <FacebookLogin
                appId="122527409820173"
                fields="name,email,picture"
                callback={responseFacebook}
                icon="fa-facebook" 
                onClick={() => console.log('clicked')}
                textButton={`${pathname === '/sign-up' ? 'Sign up' : 'Log in'} with facebook`}
                cssClass = 'facebook'
                />
            <GoogleLogin
                clientId="1005866644407-31npkpm75piigg93sc4ctkh3ufmh9pi4.apps.googleusercontent.com"
                render={renderProps => (
                <button className='google' onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    <i className='fa fa-google-plus-square'></i>
                    {`${pathname === '/sign-up' ? 'Sign up' : 'Log in'} with google`}
                </button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </Fragment>
     );
}
const mapDispatchToProps =(dispatch) => {
    return{
        authToTrue : () => {dispatch(checkIsAuth())}
    }
}
export default connect(null, mapDispatchToProps)
                (memo
                    (withRouter
                        (OAuthBntn)));