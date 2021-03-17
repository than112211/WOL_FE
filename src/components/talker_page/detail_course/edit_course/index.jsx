import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useForm } from "react-hook-form";
import { library } from '@fortawesome/fontawesome-svg-core'
import { useParams } from 'react-router';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(fas,faCheckCircle)
EditCourse.propTypes = {
    toggleEditCourse:PropTypes.func,
    modalEditCourse:PropTypes.bool,
    course:PropTypes.object,
};

function EditCourse(props) {
    const {id} = useParams();

    const [level,setLevel] = useState('basic')
    const { register, handleSubmit, errors } = useForm();
    const [status,setStatus] = useState(false)
    function changeStatus(){
        if(status)
         setStatus(!status)
     }
     function selectlevelonchange(e){
        setLevel(e.target.value)
    }
    const {modalEditCourse , toggleEditCourse , course } = props;
    function onSubmit(e) {
     
      const url = `http://localhost:8080/lecture/edit/${id}`;
      const option = {
          method : 'POST',
          mode : 'cors',
          headers: {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify({title:e.title,description:e.description,price:e.price,level:level})
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
             <Modal isOpen={modalEditCourse} toggle={toggleEditCourse} onClick={changeStatus}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader toggle={toggleEditCourse} onClick={changeStatus}>Chỉnh sửa bài học</ModalHeader>
                <ModalBody className="lecture__info">
                    <label htmlFor="">Tên bài học</label>
                      <input name="title" ref={register} defaultValue={course.title} placeholder="Tiêu đề" />  
                      <label htmlFor="">Mô tả</label>

                      <input name="description" ref={register({ required: true })} defaultValue={course.description} placeholder="Mô tả"  />
                      <label htmlFor="">Gía tiền</label>
  
                      <input name="price" ref={register({ required: true })} defaultValue={course.price} placeholder="Gia tiền" />
                      <label htmlFor="">Level</label>
 
                      <select id="level" name="levellist"  onChange={selectlevelonchange}>
                        <option value="basic" selected={(course.level === 'basic') ? true : false}>Cơ bản</option>
                        <option value="advanced" selected={(course.level === 'advanced') ? true : false}>Nâng cao</option>
                    </select> 
                    <div className="create__sucess" style={{display : status ? 'block':'none'}}>
                    <FontAwesomeIcon className="icon__sucess" icon={faCheckCircle} />Chỉnh sửa thành công
                    </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" type="submit" >Cập nhật</Button>{' '}
                  <Button color="secondary"onClick={changeStatus} onClick={toggleEditCourse}>Hủy</Button>
                </ModalFooter>
            </form>
          </Modal>
        </div>
    );
}

export default EditCourse;