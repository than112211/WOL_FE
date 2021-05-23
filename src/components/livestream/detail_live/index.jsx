import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { useParams } from 'react-router';
import './index.scss'
import socketIOClient from "socket.io-client";
import Header from '../../header/index'
import Peer from 'peerjs';

DetailLive.propTypes = {
    
};

function DetailLive(props) {
    const {id} = useParams();
    var peer = new Peer(undefined, {
        host: '/',
        port: '9000',
        path:'/peerjs'
      });
      const myvideo = document.createElement('video')

    useEffect(() => {
       const io =  socketIOClient('http://localhost:8080',{ transports : ['websocket'] });
       peer.on('open',idpeer => {
        io.emit('joinRoom',id,idpeer)
       })
       const config ={audio :false,video:true}
       navigator.mediaDevices.getUserMedia(config)
      .then(stream =>{
        addVideoStream(myvideo,stream)
        io.on('user-connected' ,(userID) =>{
            connectNewUser(userID,stream)
        })
        peer.on('call',call =>{
            console.log(call)
            call.answer(stream)
            call.on('stream',userVideoStream =>{
                addVideoStream(myvideo,userVideoStream)
            })
            
        })
         
      })
      
      

  },[])
   const connectNewUser = (userID,stream) => {
       const call = peer.call(userID,stream)
       const video  = document.createElement('video')
       call.on('stream',userVideoStream =>{
           addVideoStream(video,userVideoStream)
       })
  }
  const  addVideoStream =  (video,stream) => {
    const videoGrid = document.getElementById('video__grid')
        video.srcObject =  stream
         video.play()
        videoGrid.append(video)
    }

    return (
        <div>
            <Header></Header>
            <div className="container">

                <div className="row">
                        <div className="col-8 col-sm-8">
                            <div  id="video__grid">

                            </div>
                        
                        </div>
                        <div className="col-4 col-sm-4">

                        </div>
                </div>
            </div>
        </div>
    );
}

export default DetailLive;