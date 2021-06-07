import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import './index.scss'



SignIn.propTypes = {
    modalSignin:PropTypes.bool,
    toggleSignin:PropTypes.func,
    onHanleSubmitSignin:PropTypes.func,
};
SignIn.defaultProps ={
    modalSignin:false,
    toggleSignin:null,
    onHanleSubmitSignin:null
}

function SignIn(props) {

    const { register, handleSubmit, errors } = useForm();
    const {modalSignin , toggleSignin, onHanleSubmitSignin } = props;

    function onSubmit(e) {
      const formValue = {
        email:e.email,
        password:e.password,
      }
      onHanleSubmitSignin(formValue)

    }
    return (
      <div> 
          <Modal className="modal-le" isOpen={modalSignin} toggle={toggleSignin} >
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader toggle={toggleSignin}>Đăng nhập</ModalHeader>
              <ModalBody>
                    <input name="email" ref={register} placeholder="Email..."/>
                    <input name="password" type="password" ref={register({ required: true })} placeholder="Mật khẩu..." />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" type="submit" >Đăng nhập</Button>{' '}
                <Button color="secondary" onClick={toggleSignin}>Hủy</Button>
              </ModalFooter>
            </form>
          </Modal>           
      </div>
    );
}

export default SignIn;