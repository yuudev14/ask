import {useRef, useEffect, useState} from 'react';
import axios from 'axios';
import { socket } from '../../socket';
import {connect} from 'react-redux';
import { getNotifications, set_new_notifications } from '../../store/actions/notificationActions';

const Notification = (props) => {
    const {
        notification,
        notification_icon,
        getNotifications,
        notificationList,
        setNewNotification

    } = props;


    window.onresize = () => {
        if(window.innerWidth > 1000){
            notification.current.style.left = notification_icon.current.offsetLeft - 200 + 'px';

        }else{
            notification.current.style.left = '0px'
        }
    }

    useEffect(() => {
        getNotifications();
    }, [])
    useEffect(() => {
        socket.on('receive_notif', data => {
            setNewNotification(data)
          });
        if(window.innerWidth > 1000){
            notification.current.style.left = notification_icon.current.offsetLeft - 200 + 'px';

        }else{
            notification.current.style.left = '0px'

        }
        return () => {
            socket.off('receive_notif')
        }
            
         

    })
    return ( 
        <div ref={notification} className='notification-section hide_notif'>
            <div className='notification-container'>
                <h2>Notifications</h2>
                <div className='notification-lists'>
                    {notificationList.map((notif, i) => (
                        <div key={i} className='notification'>
                            <div className='notification-profile'>
                                {notif.profile_pic === null ? (
                                    <i className='fa fa-user'></i>
                                ) : (
                                    <img id='prof_icon' src={notif.profile_pic} />

                                )}
                            </div>
                            <div className='notification-content'>
                                <p><span className='notification-sender'>{notif.username}</span> {notif.notification_type} at <span>{notif.question}</span></p>
                            </div>
                        </div>

                    ))}

                </div>
                
                

            </div>
            
        </div>
     );
}

const mapStateToProps = state => {
    return {
        notificationList : state.notification
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getNotifications : () => dispatch(getNotifications()),
        setNewNotification : (data) => dispatch(set_new_notifications(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Notification);