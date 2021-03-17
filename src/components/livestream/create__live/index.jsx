import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory} from 'react-router';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useForm } from "react-hook-form";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './index.scss'
library.add(fas,faCheckCircle)

CreateLive.propTypes = {
    modalVideo:PropTypes.bool,
    toggleVideo:PropTypes.func,
};

function CreateLive(props) {
    const history = useHistory();
    const {modalVideo,toggleVideo} = props
    const [status,setStatus] = useState(false)
    const { register, handleSubmit, errors } = useForm();

 
    function changeStatus(){
       if(status)
        setStatus(!status)
    }
    function onSubmit(e){
       const url = 'http://localhost:8080/live/create';
       const option = {
           method : 'POST',
           mode : 'cors',
           headers: {
               'Content-Type' : 'application/json',
               'auth-token' : localStorage.getItem('token')
           },
           body: JSON.stringify({title:e.title,description:e.description})
       }
       fetch(url,option)
       .then(response => response.json())
       .then(data => {
         history.replace(`/livestream/${data._id}`)
       })

    }
    return (
        <div>
              <Modal isOpen={modalVideo} toggle={toggleVideo} onClick={changeStatus}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader toggle={toggleVideo} onClick={changeStatus}>Tạo Livestream</ModalHeader>
                <ModalBody className="lecture__info">
                      <input name="title" ref={register} placeholder="Tiêu đề" />  
                      <input name="description" ref={register({ required: true })} placeholder="Mô tả"  />  
                      
                    <div className="create__sucess" style={{display : status ? 'block':'none'}}>
                    <FontAwesomeIcon className="icon__sucess" icon={faCheckCircle} />Tạo thành công
                    </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" type="submit" >Bắt đầu</Button>{' '}
                  <Button color="secondary"onClick={changeStatus} onClick={toggleVideo}>Hủy</Button>
                </ModalFooter>
            </form>
          </Modal>
        </div>
    );
}

export default CreateLive;