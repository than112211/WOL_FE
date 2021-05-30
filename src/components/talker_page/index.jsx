import React, { useEffect, useState } from 'react';
import SideBar from './sidebar_talker/index'
import Courses from './courses/index'
import PropTypes from 'prop-types';
import './index.scss'
import { useHistory} from 'react-router';
import {BrowserRouter as Router,Switch, Route,Redirect,Link} from "react-router-dom";
import Payment from './payment/index'
import Header from '../header/index'
import socketIOClient from "socket.io-client";
import Ban from '../ban/ban';


Talker.propTypes = {
    token:PropTypes.string,
};
function Talker(props) {
    const history = useHistory();
    const {token} = props;
    const [search,setSearch] = useState('')
    const [idBought,setidBought] = useState([])
    const [courses,setCourses] = useState([]);
    const [myCourse,setmyCourse] = useState([])
    const [modalMyCourse,setmodalMyCourse] = useState(false)
    function hanlegetCourse (e){
        setmodalMyCourse(e)
    }
   
    function handleGetSearch(e){
        setSearch(e)
    }
    useEffect(() => {
        function getMyCourse() {
                const url =  `http://localhost:8080/lecture/me${search ? `?name=${search}` : ``}`;
                const option = {
                    method : 'GET',
                    mode : 'cors',
                    headers: {
                        'Content-Type' : 'application/json',
                        'auth-token' : token
                    },
                }
                fetch(url,option)
                .then(response => response.json())
                .then(data => {
                setmyCourse(data);
                })
        }
        getMyCourse();
    },[modalMyCourse,search])
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
                })
        }
        getCourses();
    },[modalMyCourse,search])
  
    return (
        <div>
            <Ban></Ban>
            <Header getchangeSearch={handleGetSearch}></Header>
           <section className="content">
                 <div className="container-fluid">
                 <div className="row">
                       <div className="col-12 col-sm-12 col-md-2">
                            <SideBar token={token} getMyCourse={hanlegetCourse}></SideBar>
                       </div>
                       <div className="col-12 col-sm-12 col-md-10">
                            <Courses idBought={idBought} disableBuy={true} courses={modalMyCourse ? myCourse : courses}></Courses> 
                       </div>
                   </div>
                 </div>
           </section>
           
        </div>
    );
}

export default Talker;