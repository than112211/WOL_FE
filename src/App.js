import './App.css';
import React , {createContext, useContext, useState} from 'react';
import Home from './components/homepage/index'
import Talker from './components/talker_page/index'
import User from './components/userpage/index'
import Learner from './components/learner_page/index'
import DetailCourse from './components/talker_page/detail_course/index'
import Quizz from './components/talker_page/quizz/index'
import EditQuizz from './components/talker_page/detail_course/edit__quizz/index'
import Livestream from './components/livestream/index'
import DetailLive from './components/livestream/detail_live/index'
import {BrowserRouter as Router,Switch, Route,Redirect} from "react-router-dom";
import Admin from './components/admin/admin';


function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/"
            render={() => {
              if(localStorage.getItem('role')=="true") 
                return <Redirect to="/learner"></Redirect> 
                 if(localStorage.getItem('role')=="false")
                  return <Redirect to="/talker"></Redirect>
                  if(localStorage.getItem('admin')=="true")
                  return <Redirect to="/admin"></Redirect>
                  else return <Home></Home>
            }}
          >
          </Route>  
            <Route exact path="/talker" 
                    render={() =>{
                      if(localStorage.getItem('role')=="true") 
                        return <Redirect to="/learner"></Redirect> 
                       if(localStorage.getItem('role')=="false")
                        return <Talker token={localStorage.getItem('token')}></Talker>
                        else return <Redirect to="/"></Redirect>
                    }}>
            </Route>
            <Route exact path="/learner" 
                    render={() =>{
                      if(localStorage.getItem('role')=="true") 
                      return  <Learner token={localStorage.getItem('token')}></Learner>
                     if(localStorage.getItem('role')=="false")
                      return <Redirect to="/talker"></Redirect>
                      else return <Redirect to="/"></Redirect>
                      }}>
            </Route>
            <Route exact path="/information/:id">
                    <User></User>
            </Route>
            <Route exact path="/lecture/:id">
                  <DetailCourse ></DetailCourse>
            </Route>
            <Route exact path="/quizz/:id">
                  <Quizz ></Quizz>
            </Route>
            <Route exact path="/quizz/edit/:id">
                  <EditQuizz></EditQuizz>
            </Route>
            <Route exact path="/livestream">
                  <Livestream></Livestream>
            </Route>
            <Route exact path="/livestream/:id">
                  <DetailLive></DetailLive>
            </Route>
            <Route exact path="/admin" 
                    render={() =>{
                      if(localStorage.getItem('role')=="true") 
                      return  <Redirect to="/learner"></Redirect>
                        if(localStorage.getItem('role')=="false")
                          return <Redirect to="/talker"></Redirect>
                            if(localStorage.getItem('admin')=="true") 
                                  return <Admin></Admin>
                              else return <Redirect to="/"></Redirect>
                      }}>
            </Route>
      </Switch>
    </Router>
  );
}

export default App;
