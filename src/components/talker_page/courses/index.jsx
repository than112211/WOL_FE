import React ,{ useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss'
import {BrowserRouter as Router,Switch, Route,Redirect,Link} from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import FormChoosePayment from './form__payment/index'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faHeart,faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import { Form } from 'reactstrap';
library.add(fas,faHeart,faThumbsDown)
  
Courses.propTypes = {
    courses:PropTypes.array,
    disableBuy:PropTypes.bool,
};

function Courses(props) {
const [chooseLevel,setChooselevel] = useState('all')
const [dropdownOpen, setOpen] = useState(false);
const toggle = () => setOpen(!dropdownOpen);
const {courses,disableBuy,search} = props;
const [id,setID] = useState('')
const [price,setPrice] = useState(0)
const [modalChoosePayment,setModalChoosePayment] = useState(false)
const toggleChoosePayment = () => setModalChoosePayment(!modalChoosePayment)
const [idBought,setIDBought] = useState([])
useEffect(() => {
    function getUser() {
            const url = 'http://localhost:8080/user/me';
            const option = {
                method : 'GET',
                mode : 'cors',
                headers: {
                    'Content-Type' : 'application/json',
                    'auth-token' : localStorage.getItem('token')
                },
            }
            fetch(url,option)
            .then(response => response.json())
            .then(data => {
                   if(data.course_bought){
                    setIDBought(data.course_bought);
                   }
            })
    }
    getUser();
},[])

function checkCourseBought ( id){
    for( let i = 0; i<idBought.length ; i ++){
        if(idBought[i] == id)
            return true
    }
}
function handleClickBuy(id,price){
    setPrice(price)
    setID(id)
    toggleChoosePayment()
}

function handleClickLevel(level){
    setChooselevel(level)
}


    return (
      <div className="container card__content">
          <div className="select__level">
                <ButtonDropdown color="primary" isOpen={dropdownOpen} toggle={toggle} className="btn__select">
            <DropdownToggle color="primary" caret>
                {chooseLevel == 'all' ? 'T???t c???' : chooseLevel == 'basic' ? 'C?? b???n' : 'N??ng cao'}
            </DropdownToggle>
            <DropdownMenu >
                <DropdownItem onClick={() => handleClickLevel('all')}>T???t c???</DropdownItem>
                <DropdownItem  onClick={()=> handleClickLevel('basic')}>C?? b???n</DropdownItem>
                <DropdownItem  onClick={() => handleClickLevel('advanced')}>N??ng cao</DropdownItem>
            </DropdownMenu>
            </ButtonDropdown>
          </div>
          <FormChoosePayment toggleChoosePayment={toggleChoosePayment} modalChoosePayment={modalChoosePayment} idcourse={id} price={price}></FormChoosePayment>
          <div className="row">
                {courses.map(course =>{
                  return  <div key={course._id} className="col-3 col-sm-3" style={{display: chooseLevel == 'all' ? 'block' : course.level == chooseLevel ? 'block' : 'none'}} >
                     <div className="cardvideo">
                         <div className="cardvideo__video">
                            <video  src={`http://localhost:8080/${course.video}`}>
                            </video>
                         </div>
                         <div className="cardvideo__content">
                         <Link to={`/lecture/${course._id}`}><h1>{course.title} ({course.level =='basic' ? 'C?? b???n' : 'N??ng cao'})</h1></Link>
                        
                             <p>G??a ti???n: {course.price} VN??</p>
                             <div className="like-dislike">
                                     <div className="like">{course.liked && course.liked.length ? course.liked : 0 }
                                           <FontAwesomeIcon  style={{color:'red',fontSize:'1.2rem'}} icon={faHeart}></FontAwesomeIcon>
                                     </div>
                                     <div className="dislike">{course.dislike && course.dislike.length ? course.dislike : 0}
                                       <FontAwesomeIcon  style={{color:'blue',fontSize:'1.2rem'}}  icon={faThumbsDown}></FontAwesomeIcon>

                                     </div>
                             </div>
                         </div>
                         <Button className="btn__buy" color={checkCourseBought(course._id) ? 'secondary':'primary'} disabled={checkCourseBought(course._id) ? true : false} style={{display: disableBuy ? 'none' : 'block' }}  onClick={() =>handleClickBuy(course._id,course.price)} >{checkCourseBought(course._id) ? '???? mua' : 'Mua ngay'}</Button>

                     </div>

                 </div>
                    })}
          </div>
      </div>
    );
}

export default Courses;