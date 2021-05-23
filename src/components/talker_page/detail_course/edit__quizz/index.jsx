import React, { useState ,useEffect} from 'react';
import PropTypes from 'prop-types';
import { useHistory} from 'react-router';
import { useParams } from 'react-router';
import './index.scss'
import Header from '../../../header/index'
import { useForm } from "react-hook-form";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faPlusCircle,faTimesCircle,faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'reactstrap';
library.add(fas,faPlusCircle,faTimesCircle,faCheckCircle)


EditQuizz.propTypes = {
    
};

 function EditQuizz(props) {
    const {id} = useParams();
    const [status,setStatus] = useState(false)
    const history = useHistory();

    const { register, handleSubmit, errors } = useForm();
    const [detailQuizz,setDetailQuizz] = useState([])
    useEffect(() => {
          function getDetailQuizz() {
                const url = `http://localhost:8080/quizz/${id}`;
                const option = {
                    method : 'GET',
                    mode : 'cors',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                }
                  fetch(url,option)
                 .then( response =>  response.json())
                    .then(data => {
                 setDetailQuizz(data.questions)
                                })
        }
           getDetailQuizz();
    },[])
    function getTrueAnswer(i,id){
        var quizContainer = (document.getElementsByClassName('quizz__container')[0].childNodes[i])
        var item = quizContainer.querySelectorAll('input[type=radio]')
            if(item[id-1].checked)
                    return true;
                else  return false;
            }
        
        function onSubmit(e){    
            var data = []
            for(let i = 0; i < detailQuizz.length ; i++){
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
        const url = `http://localhost:8080/quizz/edit/${id}`;
        const option = {
            method : 'PUT',
            mode : 'cors',
            headers: {
                'Content-Type' : 'application/json',
            },
        
            body:JSON.stringify({questions:data})
        }
         fetch(url,option)
          .then(response => response.json())
          .then(data => {
          console.log('Success:', data);
            setStatus(true)
          })
       },1000)
    }
    function handleClickNewQuiz(){
        const newQuiz = {
            question: "",
            answer1: {
                char: "",
                istrue: true,
            },
            answer2: {
                char: "",
                istrue: false,
            },
            answer3: {
                char: "",
                istrue: false,
            },
            answer4: {
                char: "",
                istrue: false,
            },
        }
        setDetailQuizz([...detailQuizz, newQuiz]) // chèn vào useState cũ
        setStatus(false)

    }
    function handleClickDeleteQuizz (i) {
        var  newQuizz = [...detailQuizz]
        newQuizz.splice(i,1)
        setDetailQuizz(newQuizz)
        setStatus(false)

   }
   function handleDeleteQuizz(){
    const url = `http://localhost:8080/quizz/delete/${id}`;
    const option = {
        method : 'DELETE',
        mode : 'cors',
        headers: {
            'Content-Type' : 'application/json',
        },
    
    }
     fetch(url,option)
      .then(response => response.json())
      .then(data => {
      if(data){
            alert('Xóa thành công')
            history.goBack()
            setStatus(false)
      }
     
      })
   
   }

   const handleChange = (e, i) => {
       const {name, value} = e.target;
       let newDetailQuiz = [...detailQuizz];
       const quizSelected = detailQuizz[i];
       const newState = {...quizSelected[name], char: value};
       if (name === 'question') {
        newDetailQuiz[i][name] = value;
       } else {
           newDetailQuiz[i][name] = newState;
       }
       setDetailQuizz(newDetailQuiz);
   }   
    return (
        <div>
            <Header></Header>
         <div className="container">

         <form onSubmit={handleSubmit(onSubmit)}>
           <div className="quizz__container">
           {  detailQuizz.map((question,i) =>{
                return <fieldset key={i} id={`quizz${i}`}>
                    <div className="recharge quizz question">
                    <FontAwesomeIcon onClick={() => handleClickDeleteQuizz(i)} icon={faTimesCircle}></FontAwesomeIcon> Câu{i+1}:  <input type="text" ref={register({ required: true })} value={question.question} onChange={(e) => {handleChange(e, i)}}  placeholder="Nhập câu hỏi" name={'question'}></input>
                    </div>
                    <div className="recharge quizz">
                        <input type="radio" value="1" name={`isAnswer${i}`} ref={register({ required: true })} defaultChecked={question.answer1.istrue ? true : false} />
                        <input type="text"ref={register({ required: true })} value={question.answer1.char} onChange={(e) => {handleChange(e, i)}}  placeholder="Đáp án" name={`answer1`}></input>
                    </div>
                    <div className="recharge quizz">
                        <input type="radio" value="2" name={`isAnswer${i}`}  ref={register({ required: true })} defaultChecked={question.answer2.istrue ? true : false}/>
                        <input type="text" ref={register({ required: true })} value={question.answer2.char} onChange={(e) => {handleChange(e, i)}}  placeholder="Đáp án" name={`answer2`} ></input>
                    </div>
                    <div className="recharge quizz">
                        <input type="radio" value="3" name={`isAnswer${i}`} ref={register({ required: true })} defaultChecked={question.answer3.istrue ? true : false}/>
                        <input type="text" ref={register({ required: true })} value={question.answer3.char} onChange={(e) => {handleChange(e, i)}}  placeholder="Đáp án" name={`answer3`} ></input>
            
                    </div>
                    <div className="recharge quizz">
                        <input type="radio" value="4" name={`isAnswer${i}`}  ref={register({ required: true })} defaultChecked={question.answer4.istrue ? true : false}/>
                        <input type="text"ref={register({ required: true })} value={question.answer4.char} onChange={(e) => {handleChange(e, i)}}  placeholder="Đáp án" name={`answer4`} ></input>
                    </div>
              </fieldset>
            })}

           </div>
            <div className="plus__quizz">
                <FontAwesomeIcon onClick={handleClickNewQuiz} icon={faPlusCircle}></FontAwesomeIcon>
            </div>
            <div className="create__sucess" style={{display : status ? 'block':'none'}}>
                    <FontAwesomeIcon className="icon__sucess" icon={faCheckCircle} />Chỉnh sửa thành công
                    </div>
           <div className="edit__course">
                    <Button  type="submit" >Cập nhật</Button> 
                    <Button  onClick={handleDeleteQuizz} >Xóa tất cả</Button> 
           </div>
           </form>

         </div>
        </div>
    );
}

export default EditQuizz;