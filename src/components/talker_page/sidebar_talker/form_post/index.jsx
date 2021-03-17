import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useForm } from "react-hook-form";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './index.scss'
library.add(fas,faCheckCircle)

Post.propTypes = {
    modalPost:PropTypes.bool,
    togglePost:PropTypes.func,
};
Post.defaultProps ={
    modalPost:false,
    togglePost:null,
}

function Post(props) {
    const [level,setLevel] = useState('basic')
    const [status,setStatus] = useState(false)
    const { register, handleSubmit, errors } = useForm();
    const {modalPost , togglePost } = props;

    function selectlevelonchange(e){
        setLevel(e.target.value)
    }
    function changeStatus(){
       if(status)
        setStatus(!status)
    }

    function onSubmit(e) {
      const data = new FormData()
      data.append('video', e.video[0])
      data.append('title',e.title)
      data.append('description',e.description)
      data.append('price',e.price) 
      data.append('level',level)   
    const url = 'http://localhost:8080/lecture/create';
    const option = {
        method : 'POST',
        mode : 'cors',
        headers: {
            'auth-token' : localStorage.getItem('token')
        },
        body: data
    }
    fetch(url,option)
    .then(response => response.json())
    .then(data => {
    setStatus(true)
    console.log('Success:', data);
    })
    }
    return (
        <div>
             <Modal isOpen={modalPost} toggle={togglePost} onClick={changeStatus}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader toggle={togglePost} onClick={changeStatus}>Tạo bài học</ModalHeader>
                <ModalBody className="lecture__info">
                      <input name="title" ref={register} placeholder="Tiêu đề" />  
                      <input name="description" ref={register({ required: true })} placeholder="Mô tả"  />  
                      <input name="price" ref={register({ required: true })}  placeholder="Gia tiền" /> 
                      <select id="level" name="levellist"  onChange={selectlevelonchange}>
                        <option value="" disabled selected hidden>Chọn level</option>
                        <option value="basic">Cơ bản</option>
                        <option value="advanced">Nâng cao</option>
                    </select> 
                      <input className="select__file" name="video" ref={register({ required: true })}  type="file"  placeholder="Tải lên"   />  
                    <div className="create__sucess" style={{display : status ? 'block':'none'}}>
                    <FontAwesomeIcon className="icon__sucess" icon={faCheckCircle} />Tạo thành công
                    </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" type="submit" >Tạo bài học</Button>{' '}
                  <Button color="secondary"onClick={changeStatus} onClick={togglePost}>Hủy</Button>
                </ModalFooter>
            </form>
          </Modal>
        </div>
    );
}

export default Post;