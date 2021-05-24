import React, { useState } from 'react';
import './index.scss'
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

FormChoosePayment.propTypes = {
    toggleChoosePayment:PropTypes.func,
    modalChoosePayment:PropTypes.bool,
    idcourse:PropTypes.string,
    price:PropTypes.number,
};

function FormChoosePayment(props) {
    const {toggleChoosePayment,modalChoosePayment,idcourse,price} = props
    const { register, handleSubmit, errors } = useForm();
    function getMethodPayment(){
        if(document.getElementById('momo').checked) return true
            if(document.getElementById('coin').checked) return false
    }
    function onSubmit(e){
            var status = getMethodPayment()
            const urlMoMo = 'http://localhost:8080/payment/buy'
            const urlCoin ='http://localhost:8080/payment/coin'
            const url =  status ? urlMoMo : urlCoin;
            const option = {
                method : 'POST',
                mode:'cors',
                headers: {
                    'Content-Type' : 'application/json',
                    'auth-token' : localStorage.getItem('token'),

                    
                },
                body:JSON.stringify({course_id:idcourse,money:price})
            }
            fetch(url,option)
            .then(response => response.json())
            .then(data => {
                toggleChoosePayment()
                    if(status){
                        window.location.href=data.link
                    }
                    else {
                        alert(data)

                    }
            })        
    }
    return (
        <div>
               <Modal isOpen={modalChoosePayment} toggle={toggleChoosePayment} >
       <form onSubmit={handleSubmit(onSubmit)}>
           <ModalHeader toggle={toggleChoosePayment} >Chọn phương thức thanh toán</ModalHeader>
           <ModalBody className="payment">
                    <fieldset id="payment">
                        <div style={{display: price >= 10000 ? 'flex' : 'none'}} className="recharge">
                            <input type="radio" value="momo" name="choosepayment"  id="momo"/>
                            <FontAwesomeIcon icon="credit-card"></FontAwesomeIcon>
                            <label htmlFor="momo">MoMo</label>
                        </div>
                        <div className="recharge">
                            <input type="radio" value="coin" checked name="choosepayment" id="coin"/>
                            <FontAwesomeIcon icon="coins"></FontAwesomeIcon>

                            <label htmlFor="coin">Coin</label>
                        </div>                      
                      </fieldset>
               
           </ModalBody>
           <ModalFooter>
             <Button color="primary" type="submit" >Đồng ý</Button>{' '}
             <Button color="secondary" onClick={toggleChoosePayment}>Hủy</Button>
           </ModalFooter>
       </form>
     </Modal>
        </div>
    );
}

export default FormChoosePayment;