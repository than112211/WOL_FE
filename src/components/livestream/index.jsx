import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router,Switch, Route,Redirect,NavLink} from "react-router-dom";
import Header from '../header/index'
import './index.scss'
import SideBar from '../talker_page/sidebar_talker/index'
import { Button } from 'reactstrap';
import CreateLive from './create__live/index'
Livestream.propTypes = {
    
};

function Livestream(props) {
    const [modalVideo, setmodalVideo] = useState(false);
    const toggleVideo = () => setmodalVideo(!modalVideo);
    const [modalMyCourse,setmodalMyCourse] = useState(false)
    function hanlegetCourse (e){
        setmodalMyCourse(e)
    }
   
    return (
        <div>
             <Header ></Header>
             <CreateLive modalVideo={modalVideo} toggleVideo={toggleVideo}></CreateLive>
           <section className="container-fluid content">
                   <div className="row">
                       <div className="col-12 col-sm-12 col-md-2">
                            <SideBar token={localStorage.getItem('token')} getMyCourse={hanlegetCourse}></SideBar>
                       </div>
                       <div className="col-12 col-sm-12 col-md-10">
                           <Button onClick={toggleVideo}>Tạo Live</Button>
                       </div>
                   </div>
           </section>
        </div>
    );
}

export default Livestream;