import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import './index.scss'
import Header from '../../header/index'
DetailLive.propTypes = {
    
};

function DetailLive(props) {
    function handleClickStarLive(){
        const config ={audio :true,video:true}
        navigator.mediaDevices.getUserMedia(config)
       .then(stream =>{
           const video = document.getElementById('video__create')
           video.srcObject = stream
           video.play()
       })
       .catch()
    }
    return (
        <div>
            <Header></Header>
            <div className="container">

                <div className="row">
                        <div className="col-8 col-sm-8">
                        <Button color="primary" onClick={handleClickStarLive}>Bắt đầu ngay</Button>

                        <video src="" id="video__create">
                        </video>
                        </div>
                        <div className="col-4 col-sm-4">

                        </div>
                </div>
            </div>
        </div>
    );
}

export default DetailLive;