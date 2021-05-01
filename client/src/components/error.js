import {connect} from 'react-redux';
import {useRef} from 'react'

const Error = (props) => {
    const {error} = props;

    const errorContainer = useRef();
    const errorTime = useRef()

    const closeError = () => {
        errorContainer.current.classList.remove('error_animate');
        errorTime.current.classList.remove('error_time_animate');
    }
    return ( 
        <div ref={errorContainer} className='error'>
            <i className='fa fa-close' onClick={closeError}></i>
            <p>{error}</p>
            <div ref={errorTime} className='error_time'></div>
        </div>
     );
}

const mapStateToProps = (state) => {
    return {
        error : state.error
    }
}
 
export default connect(mapStateToProps)(Error);