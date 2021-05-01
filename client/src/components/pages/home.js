import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import WithNav from '../../hoc/withNav';
import '../../styles/home.scss';
import React, {useRef, useEffect, useState} from 'react';
import Previous_viewed from '../dashboard/previous_viewed';
import Popular_tags from '../dashboard/popular_tags';
import HomeDashboard from './home_dasboard';
import UserDashboard from './user_dashboards';
import QuestionDetails from './question_details';
import AnswerQuestion from '../question/answer_question';


const Home = () => { 
    return ( 
        <div className='home'>
            <AnswerQuestion />
            
            <div className='tags_container'>
                <div className='tags_container_fixed'>
                    
                    <Popular_tags />

                </div>

            </div>
            <div className='questions_container'>
                <Router>
                    <Switch>
                        <Route exact path='/' component={HomeDashboard}/>
                        <Route path='/profile' component={UserDashboard}/>
                        <Route path='/U/:username' component={UserDashboard}/>
                        <Route path='/:question' component={QuestionDetails}/>

                    </Switch>
                </Router>
                
            </div>
            <div className='previous_footer_container'>
                <div className='previous_footer_container_fixed'>
                    <Previous_viewed />
                    <footer>

                    </footer>

                </div>
                
            </div>
        </div>
     );
}
 
export default WithNav(Home);