import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './index.scss'

PlayVideo.propTypes = {
    video:PropTypes.string,
    modalvideo:PropTypes.bool,
    toggleVideo:PropTypes.func,
};

function PlayVideo(props) {
    const {video,modalvideo,toggleVideo} = props
    return (
        <div>
        <Modal className="video_play" isOpen={modalvideo} toggle={toggleVideo} >
           <ModalHeader toggle={toggleVideo} >Xem video</ModalHeader>
           <ModalBody className="">
                   <iframe src={video} frameborder="0"></iframe>
           </ModalBody>
     </Modal>
   </div>
    );
}

export default PlayVideo;