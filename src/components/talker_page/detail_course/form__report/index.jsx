import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
Report.propTypes = {
    modalReport:PropTypes.bool,
    toggleReport:PropTypes.func,
    
};

function Report(props) {
    const {modalReport,toggleReport,idcourse} = props
    const { register, handleSubmit, errors } = useForm();
    function onSubmit(e){
        const url = `http://localhost:8080/report/create/${idcourse}`;
        const option = {
            method : 'POST',
            mode : 'cors',
            headers: {
                'Content-Type' : 'application/json',
                'auth-token' : localStorage.getItem('token')
            },
        
            body:JSON.stringify({
                report_templete:e.templete,
                content:e.evalute
            })
        }
         fetch(url,option)
          .then(response => response.json())
          .then(data => {   
            alert(data)
          })
    }
    return (
        <div>
               <Modal isOpen={modalReport} toggle={toggleReport} >
       <form onSubmit={handleSubmit(onSubmit)}>
           <ModalHeader toggle={toggleReport} >Báo cáo vi phạm
           </ModalHeader>
           <ModalBody className="payment">
           <p style={{color:'red'}}>Lưu ý : Chỉ được báo cáo 1 lần cho 1 bài học </p>

                    <fieldset id="payment">
                        <div className="recharge">
                            <input ref={register({ required: true })} type="radio" value="Bài không chất lượng" name="templete" checked id="100000"/>
                            <label htmlFor="100000">Bài không chất lượng</label>
                        </div>
                        <div className="recharge">
                            <input ref={register({ required: true })} type="radio" value="Không có bài trắc nghiệm" name="templete" id="200000"/>
                            <label htmlFor="200000">Không có bài trắc nghiệm</label>
                        </div>
                        <div className="recharge">
                            <input ref={register({ required: true })} type="radio" value="Không đúng so với mô tả" name="templete" id="300000"/>
                            <label htmlFor="300000">Không đúng so với mô tả</label>
                        </div>     
                      </fieldset>
                      <input type="text" ref={register({ required: true })} placeholder="Nhận xét thêm"  name="evalute" id="400000"/>

               
           </ModalBody>
           <ModalFooter>
             <Button color="primary" type="submit" >Báo cáo</Button>{' '}
             <Button color="secondary" onClick={toggleReport}>Hủy</Button>
           </ModalFooter>
       </form>
     </Modal>
        </div>
    );
}

export default Report;