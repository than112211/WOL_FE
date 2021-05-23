import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router,Switch, Route,Redirect,NavLink,Link} from "react-router-dom";

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
    const [live,setLive] = useState([])
   
    useEffect(() => {
        function getLiveStream() {
                const url =  'http://localhost:8080/live/all';
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
                setLive(data);
                })
        }
        getLiveStream();
    },[])
    function handleClickViewLive(id) {
    }
    return (
        <div>
             <Header ></Header>
             <CreateLive modalVideo={modalVideo} toggleVideo={toggleVideo}></CreateLive>
           <section className="container-fluid content">
                   <div className="row">
                       <div className="col-12 col-sm-12 col-md-2">
                       <Button onClick={toggleVideo}>Tạo Live</Button>

                       </div>
                       <div className="col-12 col-sm-12 col-md-10">
                         <div className="row">
                             { live ? live.map((live ,index)=>{
                               return <div className="col-6 col-sm-6 col-md-3">

                            <Link to={`/livestream/${live._id}`}> <h1 onClick={() => handleClickViewLive(live._id)}>Video:{index+1}</h1></Link>
                               </div>

                           }) : <></>}
                         </div>
                        
                       </div>
                   </div>
           </section>
        </div>
    );
}

export default Livestream;