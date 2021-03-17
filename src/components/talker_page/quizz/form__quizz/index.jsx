import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import './index.scss'


FormQuizz.propTypes = {
    number:PropTypes.number,
};

function FormQuizz(props) {
    const { register, handleSubmit, errors } = useForm();
    const {number} = props
    var list = []
   for( let i =0 ; i<number;i++){
      if(i == number){
            list = []
      }
      else {
        list.push(<fieldset id={`quizz${i}`}>
        <div className="recharge quizz question">
           Câu{i+1}: <input type="text" ref={register({ required: true })} placeholder="Nhập câu hỏi" name={`question${i}`}></input>
        </div>
        <div className="recharge quizz">
            <input type="radio" value="1" name={`isAnswer${i}`} checked ref={register({ required: true })} />
            <input type="text"ref={register({ required: true })}  placeholder="Đáp án" name={`answer${i}`} ></input>
        </div>
        <div className="recharge quizz">
            <input type="radio" value="2" name={`isAnswer${i}`}  ref={register({ required: true })}/>
            <input type="text" ref={register({ required: true })}  placeholder="Đáp án" name={`answer${i}`} ></input>
        </div>
        <div className="recharge quizz">
            <input type="radio" value="3" name={`isAnswer${i}`} ref={register({ required: true })}/>
            <input type="text" ref={register({ required: true })}  placeholder="Đáp án" name={`answer${i}`} ></input>
 
        </div>
        <div className="recharge quizz">
            <input type="radio" value="4" name={`isAnswer${i}`}  ref={register({ required: true })}/>
            <input type="text"ref={register({ required: true })}  placeholder="Đáp án" name="answer4" ></input>
 
        </div>
      
      </fieldset>
    )
      }
   }
   
   console.log(list)
    return (
        <div className="quizz__container">
            {list.map(item =>{
                return item
            })}
        </div>
    );
}

export default FormQuizz;