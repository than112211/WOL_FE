import React, { useState} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router,Switch, Route,Redirect,Link} from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Header from '../../header/index'
import { useParams } from 'react-router';
import FormQuizz from './form__quizz/index'
import './index.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(fas,faCheckCircle)

Quizz.propTypes = {
  
};
function Quizz(props) {
    const {id} = useParams();
    const { register, handleSubmit, errors } = useForm();
    const [number,setNumber] = useState(0)
    const [status,setStatus] = useState(false)
function getTrueAnswer(i,id){
    var quizContainer = (document.getElementsByClassName('quizz__container')[0].childNodes[i])
    var item = quizContainer.querySelectorAll('input[type=radio]')
        if(item[id-1].checked)
                return true;
            else  return false;
        }
    
    function onSubmit(e){    
        var data = []
        for(let i = 0; i < number ; i++){
            var quizContainer = document.getElementsByClassName('quizz__container')[0].childNodes[i]
            for(let j = 0 ; j< 5 ; j++){
                var quizItem =  quizContainer.querySelectorAll('input[type=text]')
                var formData = {}
                formData.question= quizItem[0].value
                formData.answer1= {char:quizItem[1].value,istrue:getTrueAnswer(i,1)}
                formData.answer2= {char:quizItem[2].value,istrue:getTrueAnswer(i,2)}
                formData.answer3= {char:quizItem[3].value,istrue:getTrueAnswer(i,3)}
                formData.answer4= {char:quizItem[4].value,istrue:getTrueAnswer(i,4)}
            }
          data.push(formData) 
        }
       

   setTimeout(function(){
    const url = `http://localhost:8080/quizz/create/${id}`;
    const option = {
        method : 'POST',
        mode : 'cors',
        headers: {
            'Content-Type' : 'application/json',
        },
    
        body:JSON.stringify({questions:data})
    }
     fetch(url,option)
      .then(response => response.json())
      .then(data => {
        if( data && number>0) {
            setStatus(true)
        }
      })
   },1000)
}



function hanleClickCreateQuizz(){
    var number = document.getElementById('input_number_quizz')
   setNumber(number.value)
   setStatus(false)
    }
    return (
        <div>
            <Header></Header>
           <div className="content__quizz">
           <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>

            <div className="create__sucess" style={{display : status ? 'block':'none'}}>
                    <FontAwesomeIcon className="icon__sucess" icon={faCheckCircle} />Tạo thành công
                    </div>
            <div className="create__quizz">
                <input  ref={register({ required: true })} type="text" name="" id="input_number_quizz" placeholder="Nhập số câu" />
                <Button color="primary" onClick={hanleClickCreateQuizz}>Tạo</Button>
            </div>
             <FormQuizz number={number}></FormQuizz>
             <div className="btn__create__quizz">
             <Button color="primary" type="submit" style={{display: number > 0 ? 'block' : 'none'}} >Tạo trắc nghiệm</Button>{' '}

             </div>
       </form>
            </div>
           </div>
        </div>
    );
    }

export default Quizz;