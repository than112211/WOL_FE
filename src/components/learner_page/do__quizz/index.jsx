import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useForm } from "react-hook-form";
import { library } from '@fortawesome/fontawesome-svg-core'
import { useParams } from 'react-router';
import './index.scss'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(fas,faCheckCircle)
DoQuizz.propTypes = {
    toggleDoQuizz:PropTypes.func,
    modalDoQuizz:PropTypes.bool,
    quizz:PropTypes.array,
};

function DoQuizz(props) {
    const { register, handleSubmit, errors } = useForm();
    const [current,setcurrent] = useState(0)
    const [showAnswer,setShowAnswer] = useState(false)
    const [showScore,setShowScore] = useState(false)
    const [score,setScore] = useState(0)
    const { toggleDoQuizz, modalDoQuizz ,quizz} = props
    function onSubmit(e){
        setShowScore(false)
        setcurrent(0)
        setScore(0)
        setShowAnswer(false)

    }
    function handleClickAnswer(istrue){
        if(istrue === true) {
            const newScore = score + 1
            setScore(newScore)
        }
     
        const nextQuestion = current + 1
        if(nextQuestion <  quizz.length)
        setcurrent(nextQuestion)
        else setShowScore(!showScore)
    }
 
    function handleShowAnswer(){
        setShowAnswer(true)
    }
    return (
        <div>
              <Modal isOpen={modalDoQuizz} toggle={toggleDoQuizz} >
            <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader toggle={toggleDoQuizz} >Bài tập</ModalHeader>
                <ModalBody className="lecture__info">
                   {showScore ?  <div className="score">Bạn đã đạt {score}/{quizz.length} câu
                    <Button color="success" onClick={handleShowAnswer}>Hiển thị đáp án</Button>
                    {showAnswer ? quizz.map((quizz,index) =>{
                        return  <div style={{margin:'2rem'}} className="question__container">
                        <div className="question__section">
                             <div className="question__count" style={{color:'red'}}>Question {index+1}</div>
                             <div  className="question__text">
                                 { quizz.question }
                             </div>
                         </div>
                         <div className="answer__section">
                             <Button color={quizz.answer1.istrue ? "success" : "secondary"}>{ quizz.answer1.char }</Button>
                             <Button color={quizz.answer2.istrue ? "success" : "secondary"}>{ quizz.answer2.char }</Button>
                             <Button color={quizz.answer3.istrue ? "success" : "secondary"}>{ quizz.answer3.char }</Button>
                             <Button color={quizz.answer4.istrue ? "success" : "secondary"}>{ quizz.answer4.char }</Button>
                         </div>
                        </div>
                    }) : ""}
                   </div> :  <div className="question__container">
                   <div className="question__section">
                        <div className="question__count">Question {current}/{quizz.length}</div>
                        <div className="question__text">
                            {quizz.length ? quizz[current].question : ""}
                        </div>
                    </div>
                    <div className="answer__section">
                        <Button color="success" onClick={() => handleClickAnswer(quizz.length ? quizz[current].answer1.istrue : false)}>A. {quizz.length ? quizz[current].answer1.char : "Nulll"}</Button>
                        <Button color="success" onClick={() => handleClickAnswer(quizz.length ? quizz[current].answer2.istrue : false)}>B. {quizz.length ? quizz[current].answer2.char : "Nulll"}</Button>
                        <Button color="success" onClick={() => handleClickAnswer(quizz.length ? quizz[current].answer3.istrue : false)}>C. {quizz.length ? quizz[current].answer3.char : "Nulll"}</Button>
                        <Button color="success" onClick={() => handleClickAnswer(quizz.length ? quizz[current].answer4.istrue : false)}>D. {quizz.length ? quizz[current].answer4.char : "Nulll"}</Button>
                    </div>
                   </div>
                
                    }
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" type="submit" >Làm lại</Button>{' '}
                  <Button color="secondary" type="submit" onClick={toggleDoQuizz}>Hủy</Button>
                </ModalFooter>
            </form>
          </Modal>
        </div>
    );
}

export default DoQuizz;