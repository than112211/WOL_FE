import React , {useState}from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useForm } from "react-hook-form";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'

EditInfo.propTypes = {
    modalEditInfo:PropTypes.bool,
    toggleEditInfo:PropTypes.func,
    toggleStatus:PropTypes.func,

};

function EditInfo(props) {
    const { modalEditInfo,toggleEditInfo,toggleStatus} = props
    const { register, handleSubmit, errors } = useForm();
    const [statusChange,setStatusChange] = useState(false)
    const [messEditInfo,setmessEditInfo] = useState('')
    const toggleStatusEditInfo = () => { if(statusChange)
        setStatusChange(!statusChange);}
    function onSubmit(e){
        const url = 'http://localhost:8080/user/update';
      const option = {
          method : 'PUT',
          mode : 'cors',
          headers: {
              'Content-Type' : 'application/json',
              'auth-token' : localStorage.getItem('token'),
          },
          body: JSON.stringify(e)
      }
      fetch(url,option)
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        toggleStatus()
        setmessEditInfo(data.message)
      })
    }
    return (
        <div>
                <Modal isOpen={modalEditInfo} toggle={toggleEditInfo} onClick={toggleStatusEditInfo}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader toggle={toggleEditInfo} onClick={toggleStatusEditInfo}>Thông tin cá nhân</ModalHeader>
                <ModalBody>
                      <input name="name" ref={register} placeholder="Họ và tên" />  
                      <input name="dob" ref={register({ required: true })} type="date" placeholder="Ngày sinh"  />  
                      <input name="phone" ref={register({ required: true })}  placeholder="Số điện thoại" />  
                      <div className="create__sucess" style={{display : statusChange ? 'block':'none'}}>
                    <FontAwesomeIcon className="icon__sucess" icon={faCheckCircle} />{messEditInfo}
                    </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" type="submit">Sửa</Button>{' '}
                  <Button color="secondary"  onClick={toggleStatusEditInfo} onClick={toggleEditInfo}>Hủy</Button>
                </ModalFooter>
            </form>
          </Modal>
        </div>
    );
}

export default EditInfo;