import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import './index.scss'

SignUp.propTypes = {
    modalSignup:PropTypes.bool,
    toggleSignup:PropTypes.func,
    onHanleSubmitSignup:PropTypes.func,
};
SignUp.defaultProps ={
  modalSignup:false,
  toggleSignup:null,
    onHanleSubmitSignup:null
}
function getGender(){
  if(document.getElementById('gendermale').checked)
    return true
  if(document.getElementById('genderfemale').checked)
      return false
}
function getRole(){
  if(document.getElementById('roletalker').checked)
    return true
  if(document.getElementById('rolelearner').checked)
    return false
}

function SignUp(props) {
    const { register, handleSubmit, errors } = useForm();
    const {modalSignup , toggleSignup, onHanleSubmitSignup } = props;

    function onSubmit(e) {
      const formValue = {
        name:e.fullname,
        dob:e.dob,
        phone:e.phonenumber,
        email:e.email,
        password:e.password,
        gender:getGender(),
        role:getRole(),
      }
      onHanleSubmitSignup(formValue)
    }
    return (
      <div>
          <Modal isOpen={modalSignup} toggle={toggleSignup} >
            <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader toggle={toggleSignup}>Đăng kí</ModalHeader>
                <ModalBody>
                      <input name="fullname"  ref={register} placeholder="Họ và tên" />  
                      <input name="dob" ref={register({ required: true })} type="date" placeholder="Ngày sinh"  />  
                      <input name="phonenumber" type="number" ref={register({ required: true })}  placeholder="Số điện thoại" />  
                      <input name="email" ref={register({ required: true })}  placeholder="Email" />  
                      <input name="password" type="password" ref={register({ required: true })}  placeholder="Mật khẩu" /> 
                      <input name="repassword" type="password" ref={register({ required: true })}  placeholder="Nhập lại Mật khẩu" /> 
                      <fieldset id="gender">
                        <input type="radio" value="value1" name="gender" id="gendermale"/>
                        <label htmlFor="gendermale">Nam</label>
                        <input type="radio" value="value2" name="gender" id="genderfemale"/>
                        <label htmlFor="genderfemale">Nữ</label>
                      </fieldset>
                      <fieldset id="role">
                        <input type="radio" value="value1" name="role" id="roletalker"/>
                        <label htmlFor="roletalker">Học sinh</label>
                        <input type="radio" value="value2" name="role" id="rolelearner"/>
                        <label htmlFor="rolelearner">Giao viên</label>
                      </fieldset>
                </ModalBody>
                <ModalFooter>
                <p>Khi đăng ký trên WOL, bạn đã đồng ý với <strong>Các chính sách</strong> và <strong>Chính sách bảo mật</strong> của chúng tôi.</p>
                  <Button color="primary" type="submit">Đăng kí</Button>{' '}
                  <Button color="secondary" onClick={toggleSignup}>Hủy</Button>
                </ModalFooter>
            </form>
          </Modal>
      </div>
    );
}

export default SignUp;