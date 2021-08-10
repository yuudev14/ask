import { resetUserInfo, setAuthToFalse } from "../../store/actions/authActions";
import axios from 'axios';
import {useRef} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { socket } from "../../socket";
import { seen_all_notifications } from "../../store/actions/notificationActions";

const ProfileOption = (props) => {

    const {
        userInfo,
        authToFalse,
        resetUserInfo,
        notification,
        notification_icon,
        askForm,
        notificationList,
        seenAllNotification
    } = props;

    
    
    
    
    const profile_options = useRef();
    const profile_btn = useRef();

    

    const logout = async() => {
        try {
            await axios.post('/authentication/logout',{},{headers : {token : JSON.parse(localStorage.getItem('ask_token'))}});
            localStorage.removeItem('ask_token');
            authToFalse();
            resetUserInfo();
            props.history.push('/');
            socket.disconnect();
            
        } catch (err) {
            console.log(err)
            
        }
        

    }
    const showAskForm = () => {
        askForm.current.classList.add('unhide_ask_form');

    }
    const notificationToggle = async() => {
        notification.current.classList.toggle('hide_notif');
        seenAllNotification()
        try {
            await axios.post('/dashboard/seen-notification',{},{headers : {token : JSON.parse(localStorage.getItem('ask_token'))}});
            

        } catch (error) {
            console.log(error);
            
        }

    }
    const show_profile_option = () => {
        profile_options.current.classList.toggle('hide');
    };

    const notSeenNotification = notificationList.filter(notif => notif.notif_status === 'NOT SEEN').length;
    
    return ( 
        <>
            <button onClick={showAskForm}>Ask</button>
            <i id='notif_icon' ref={notification_icon} onClick={notificationToggle} className='fa fa-bell notification-i'>
                {notSeenNotification > 0 && notSeenNotification }
            </i>
            <div ref={profile_btn} className='profile_btn' onClick={show_profile_option}>
                {userInfo.profile_pic === null ? (
                    <i className='fa fa-user'></i>
                ) : (
                    <img id='prof_icon' src={userInfo.profile_pic} alt={userInfo.profile_pic}/>

                )}
                <ul ref={profile_options} className='profile_options hide'>

                    <li onClick={logout}>log-out</li>
                    <Link to='/profile'><li>profile</li></Link>   
                </ul>
                
            </div>
            

        </>
     );
}
const mapStateToProps = (state) => {
    return{
        userInfo : state.user,
        notificationList : state.notification
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        authToFalse : () => dispatch(setAuthToFalse()),
        resetUserInfo : () => dispatch(resetUserInfo()),
        seenAllNotification : () => dispatch(seen_all_notifications())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)
(withRouter(ProfileOption));