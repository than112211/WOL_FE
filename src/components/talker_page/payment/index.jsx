import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './index.scss'

Payment.propTypes = {
    togglePayment:PropTypes.func,
    modalPayment:PropTypes.bool,
    onHanleSubmitPayment:PropTypes.func,
};
Payment.defaultProps ={
    togglePayment:null,
    modalPayment:false,
    onHanleSubmitPayment:null
}
function Payment(props) {
    const {togglePayment,modalPayment,onHanleSubmitPayment} = props
    const { register, handleSubmit, errors } = useForm();
    function getMoney(){
        var money = document.getElementsByName('payment')
        for(let i = 0 ; i < money.length ; i ++){
            if(money[i].checked) 
                return money[i].value
        }
    }
    function onSubmit(e) {
        const data = {
            money:getMoney(),
          }
        onHanleSubmitPayment(data)
    }

    return (
        <div>
        <Modal isOpen={modalPayment} toggle={togglePayment} >
       <form onSubmit={handleSubmit(onSubmit)}>
           <ModalHeader toggle={togglePayment} >Nạp tiền</ModalHeader>
           <ModalBody className="payment">
                    <fieldset id="payment">
                        <div className="recharge">
                            <input type="radio" value="100000" name="payment" checked id="100000"/>
                            <label htmlFor="100000">100.000VNĐ</label>
                        </div>
                        <div className="recharge">
                            <input type="radio" value="200000" name="payment" id="200000"/>
                            <label htmlFor="200000">200.000VNĐ</label>
                        </div>
                        <div className="recharge">
                            <input type="radio" value="300000" name="payment" id="300000"/>
                            <label htmlFor="300000">300.000VNĐ</label>
                        </div>
                        <div className="recharge">
                            <input type="radio" value="400000" name="payment" id="400000"/>
                            <label htmlFor="400000">400.000VNĐ</label>
                        </div>
                      
                      </fieldset>
               
           </ModalBody>
           <ModalFooter>
             <Button color="primary" type="submit" >Nạp tiền</Button>{' '}
             <Button color="secondary" onClick={togglePayment}>Hủy</Button>
           </ModalFooter>
       </form>
     </Modal>
   </div>
    );
}

export default Payment;