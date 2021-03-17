import React, { useState }from 'react';
import PropTypes from 'prop-types';
import '../index.scss'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useForm } from "react-hook-form";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(fas,faCheckCircle)


ChangePassword.propTypes = {
    togglePassword:PropTypes.func,
    toggleStatus:PropTypes.func,

    modalPassword:PropTypes.bool,
};

function ChangePassword(props) {
  const [messChange,setMessChange] = useState('')

  const [statusChange,setStatusChange] = useState(false)
    const { register, handleSubmit, errors } = useForm();

    const { togglePassword,modalPassword,toggleStatus} = props;
    const toggleStatusPassword = () => { if(statusChange)
      setStatusChange(!statusChange);}

   function onSubmit(e){
     if(e.newpassword == e.renewpassword){
      const url = 'http://localhost:8080/user/changepassword';
      const option = {
          method : 'POST',
          mode : 'cors',
          headers: {
              'Content-Type' : 'application/json',
              'auth-token' : localStorage.getItem('token'),
          },
          body: JSON.stringify({oldpassword:e.oldpassword,newpassword:e.newpassword})
      }
      fetch(url,option)
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setStatusChange(true)
        setMessChange(data.message)
        toggleStatus()
      })
     }
     else {
      setStatusChange(true)
       setMessChange('Mật khẩu mới không trùng khớp')
     }
    }
   
    return (
        <div>
             <Modal isOpen={modalPassword} toggle={togglePassword} onClick={toggleStatusPassword}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader toggle={togglePassword}  >Thay đổi mật khẩu</ModalHeader>
                <ModalBody className="lecture__info">
                      <input name="oldpassword" ref={register} placeholder="Mật khẩu cũ" />  
                      <input name="newpassword" ref={register({ required: true })} placeholder="Mật khẩu mới"  />  
                      <input name="renewpassword" ref={register({ required: true })}  placeholder="Nhập lại mật khẩu mới" /> 
                      
                    <div className="create__sucess" style={{display : statusChange ? 'block':'none'}}>
                    <FontAwesomeIcon className="icon__sucess" icon={faCheckCircle} />{messChange}
                    </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" type="submit" >Đồng ý</Button>{' '}
                  <Button color="secondary" onClick={toggleStatusPassword} onClick={togglePassword} >Hủy</Button>
                </ModalFooter>
            </form>
          </Modal>
        </div>
    );
}

export default ChangePassword;