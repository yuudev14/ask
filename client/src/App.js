import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/pages/home';
import login from './components/pages/login';
import Signup from './components/pages/signup';
import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { checkIsAuth } from './store/actions/authActions';
import './styles/error.scss';
import Error from './components/error';
import { socket } from './socket';


const App = (props) => {
  const {checkAuth, auth} = props;

  useEffect(() => {
    checkAuth();
    return () => {
      if(auth){
        socket.disconnect();
      }
    }

  }, [])

 


  return (
    <div className="App" >
      <Error />
      <Router>
        <Switch>
          <Route exact path = '/' component={Home}/>
          <Route path = '/profile' component={Home}/>
          <Route path = '/U/:username' component={Home}/>
          <Route path = '/login' component={login}/>
          <Route path = '/sign-up' component={Signup}/>
          <Route path = '/:question' component={Home}/>
          
        </Switch>

      </Router>

      
      
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    auth : state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuth : () => {dispatch(checkIsAuth())}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
