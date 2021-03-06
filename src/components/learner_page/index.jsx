import React, { useEffect, useState } from 'react';
import SideBar from '../talker_page/sidebar_talker/index'
import Courses from '../talker_page/courses/index'
import PropTypes from 'prop-types';
import { useHistory} from 'react-router';
import {BrowserRouter as Router,Switch, Route,Redirect,Link} from "react-router-dom";
import Payment from '../talker_page/payment/index'
import Header from '../header/index'
import socketIOClient from "socket.io-client";
import Ban from '../ban/ban'

Learner.propTypes = {
    
};

function Learner(props) {
    const [courses,setCourses] = useState([]);
    const [myCourse,setmyCourse] = useState([])
    const [search,setSearch] = useState('')
    const [modalMyCourse,setmodalMyCourse] = useState(false)
    function hanlegetCourse (e){
        setmodalMyCourse(e)
    }
  
    useEffect(() => {
        function getCourses() {
                const url = `http://localhost:8080/lecture/all${search ? `?name=${search}` : ``}`;
                const option = {
                    method : 'GET',
                    mode : 'cors',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                }
                fetch(url,option)
                .then(response => response.json())
                .then(data => {
                setCourses(data);
                console.log('Success:', data);
                })
        }
        getCourses();
    },[modalMyCourse,search])

    useEffect(() => {
        function getMyCourse() {
                const url = `http://localhost:8080/lecture/leaner/me${search ? `?name=${search}` : ``}`;
                const option = {
                    method : 'GET',
                    mode : 'cors',
                    headers: {
                        'Content-Type' : 'application/json',
                        'auth-token' : localStorage.getItem('token')
                    },
                }
                fetch(url,option)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                setmyCourse(data);
                })
        }
        getMyCourse();
    },[modalMyCourse,search])
    function handleGetSearch(e){
        setSearch(e)
    }
    return (
        <div>
  <div>
      <Ban></Ban>
            <Header getchangeSearch={handleGetSearch}></Header>
           <section className="content">
                   <div className="row">
                       <div className="col-12 col-sm-12 col-md-2">
                            <SideBar disablePost={true}  getMyCourse={hanlegetCourse}></SideBar>
                       </div>
                       <div className="col-12 col-sm-12 col-md-10">
                            <Courses courses={modalMyCourse ? myCourse : courses}></Courses> 
                       </div>
                   </div>
           </section>
           
        </div>        </div>
    );
}

export default Learner;