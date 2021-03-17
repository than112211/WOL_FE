import React , {useState} from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useForm } from "react-hook-form";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
Avartar.propTypes = {
    toggleAvartar:PropTypes.func,
    modalAvartar:PropTypes.bool,
    toggleStatus:PropTypes.func,
};

function Avartar(props) {
    const {toggleAvartar,modalAvartar,toggleStatus} = props
    const { register, handleSubmit, errors } = useForm();
    const [statusChange,setStatusChange] = useState(false)
    const [messAvartar,setmessAvartar] = useState('')
    const toggleStatusAvartar = () => { if(statusChange)
        setStatusChange(!statusChange);}
    function onSubmit(e){    
        const data = new FormData()
        data.append('avartar', e.avartar[0])
      const url = 'http://localhost:8080/user/avartar';
      const option = {
          method : 'POST',
          mode : 'cors',
          headers: {
              'auth-token' : localStorage.getItem('token')
          },
          body:data
      }
      fetch(url,option)
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        setStatusChange(true)
        setmessAvartar(data.message)
        toggleStatus()
        })
    }
    return (
        <div>
             <Modal isOpen={modalAvartar} toggle={toggleAvartar} onClick={toggleStatusAvartar}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader toggle={toggleAvartar}  >Thay đổi ảnh đại diện</ModalHeader>
                <ModalBody className="lecture__info">
                      <input name="avartar" ref={register({ required: true })} type="file"  placeholder="Chọn ảnh đại diện" /> 
                      
                    <div className="create__sucess" style={{display : statusChange ? 'block':'none'}}>
                    <FontAwesomeIcon className="icon__sucess" icon={faCheckCircle} />{messAvartar}
                    </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" type="submit" >Đồng ý</Button>{' '}
                  <Button color="secondary" onClick={toggleStatusAvartar} onClick={toggleAvartar} >Hủy</Button>
                </ModalFooter>
            </form>
          </Modal>
        </div>
    );
}

export default Avartar;