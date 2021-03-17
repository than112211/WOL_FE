import React, { useState ,useEffect} from 'react';
import {BrowserRouter as Router,Switch, Route,Redirect,Link} from "react-router-dom";
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import Header from '../../header/index'
import Quizz from '../quizz/index'
import './index.scss'
import PlayVideo from './play_video/index'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faHeart,faThumbsDown,faTimesCircle,faCheckCircle,faToggleOn,faToggleOff } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'reactstrap';
import EditCourse from './edit_course/index'
import DoQuizz from '../../learner_page/do__quizz/index'
library.add(fas,faHeart,faThumbsDown,faTimesCircle,faCheckCircle)
DetailCourse.propTypes = {
    
};

function DetailCourse(props) {
    const {id} = useParams();
    var i = 1
    const [quizz,setQuizz] = useState([])
    const [modalDoQuizz,setModalDoQuizz] = useState(false)
    const toggleDoQuizz = () => setModalDoQuizz(!modalDoQuizz)
    const [createdQuizz,setCreatedQuizz] = useState([])
    const [myCourseLeaner,setMyCourseLeaner] = useState(false)
    const [detailCourse,setDetailCourse] = useState({})
    const [editCourse,setEditCourse] = useState(false)
    const [playvideo,setPlayvideo] = useState('')
    const [toggleOn,settoggleOn] = useState(false)
    const [modalVideo, setMoDalVideo] = useState(false);
    const toggleVideo = () => setMoDalVideo(!modalVideo);
    const [like,setlike] = useState(false)
    const [dislike,setdislike] = useState(false)
    const [modalEditCourse,setmodalEditCourse] = useState(false);
    const toggleEditCourse = () => setmodalEditCourse(!modalEditCourse);
    const toggleLike = () => {
        if(dislike){
            toggledislike()
            setlike(!like)
        }
        else setlike(!like)
    };
    const toggledislike = () => {
        if(like) 
           {
            toggleLike()
            setdislike(!dislike)
           }
            else setdislike(!dislike)
    };
        function hanleClickDisLike(id){
     
            toggledislike()
        }
        function hanleClickLike(id) {
       
            toggleLike()       
        }
        function checkMyVideo(id) {
                const url = `http://localhost:8080/lecture/myvideo/${id}`;
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
                    setMyCourseLeaner(data.mycourse)
                })
        }

    function checkUser(value){
        const  url = `http://localhost:8080/lecture/me/${id}`;
        const option = {
            method : 'GET',
            mode : 'cors',
            headers: {
                'Content-Type' : 'application/json',
            },
        }
        fetch(url,option)
        .then(response => response.json())
        .then(data => {
            checkMyVideo(data._id);
            console.log(data)
            setDetailCourse(data);
            if(value == data.id_user) {
                setEditCourse(true)
            } else setEditCourse(false)
        })


     }
  function setPlayVideo(video){
      setPlayvideo(`http://localhost:8080/${video}`)
      toggleVideo();
  }
  useEffect(() => {
    function getCreatedQuizz() {
            const url = `http://localhost:8080/quizz/all/${id}`;
            const option = {
                method : 'GET',
                mode : 'cors',
                headers: {
                    'Content-Type' : 'application/json',
                },
            }
            fetch(url,option)
            .then(response => response.json())
            .then(data => {
                setCreatedQuizz(data)
                console.log(data)
            })
    }
    getCreatedQuizz();
},[toggleOn])

function hanleClickActive(id){
    const url = `http://localhost:8080/quizz/active/${id}`;
    const option = {
        method : 'POST',
        mode : 'cors',
        headers: {
            'Content-Type' : 'application/json',
        },
    }
    fetch(url,option)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        settoggleOn(!toggleOn)
    })
}

function handleClickDoQuizz(id) {
    console.log(id)
    const url = `http://localhost:8080/quizz/${id}`;
    const option = {
        method : 'GET',
        mode : 'cors',
        headers: {
            'Content-Type' : 'application/json',
        },
    }
    fetch(url,option)
    .then(response => response.json())
    .then(data => {
        setQuizz(data.questions)
            toggleDoQuizz()
    })
}
    return (
        <div>
            <DoQuizz quizz={quizz} toggleDoQuizz={toggleDoQuizz} modalDoQuizz={modalDoQuizz}></DoQuizz>
            <EditCourse course={detailCourse} toggleEditCourse= {toggleEditCourse} modalEditCourse={modalEditCourse}></EditCourse>
            <Header onCheckUser={checkUser}></Header>
            <div className="container detail">
                <div className="row">
                    <div className="col-4 col-sm-4">
                         <video  src={`http://localhost:8080/${detailCourse.video}`}>
                         </video>
                        <div style={{display: myCourseLeaner ? 'block' : 'none'}} className="leaner__detail-video">
                        <div className="like-dislike">
                                                <div className="like">
                                                    <FontAwesomeIcon onClick={() => hanleClickLike(detailCourse._id)} style={{color:like ? 'red' : 'gray',fontSize:'1.2rem'}} icon={faHeart}></FontAwesomeIcon>
                                                </div>
                                                <div className="dislike">
                                                <FontAwesomeIcon onClick={() =>hanleClickDisLike(detailCourse._id)} style={{color: dislike ? 'blue' :'gray',fontSize:'1.2rem'}}  icon={faThumbsDown}></FontAwesomeIcon>

                                                </div>
                        </div>
                         <Button className="btn__seevideo" color="primary"  onClick={() => setPlayVideo(detailCourse.video)}>Xem</Button>
                        <PlayVideo video={playvideo} modalvideo ={modalVideo} toggleVideo={toggleVideo}></PlayVideo>
                      

                         </div>
                    </div>
                    <div className="col-8 col-sm-8">
                        <div className="detail__course">
                            <h1>{detailCourse.title}</h1>
                            <p>{detailCourse.description}</p>
                            <p>Giá: {detailCourse.price}</p>
                            <div className="tuongtac">
                                <div className="like">Lượt like: {detailCourse.liked}</div>
                                <div className="dislike">Lượt dislike: {detailCourse.dislike}</div>
                                <div className="bought">Lượt mua: {detailCourse.bought}</div>

                            </div>
                            <p>Ngày tạo: {detailCourse.date_create}</p>
                        </div>
                    </div>
                </div>
                <div style={{display: myCourseLeaner ? 'block' : 'none'}} className="row">
                    <div className="col-12 col-sm-12">
                            
                    {createdQuizz.map(quizz=>{
                                if(quizz.active) return <Button onClick={() => handleClickDoQuizz(quizz._id)} className="btn__quizz-list" color="success">Bài {i++}</Button>

                            })}
                    </div>

                         </div>
                <div className="row" style={{display: editCourse ? 'block' : 'none'}}>
                  <div className="edit__course"  >
                  <button onClick={() => setPlayVideo(detailCourse.video)}>Xem</button>
                  <button  ><Link to={`/quizz/${detailCourse._id}`}>Tạo trắc nghiệm</Link></button>
                    <button onClick={toggleEditCourse}>Chỉnh sửa bài học</button>
                  </div>
                  <div className="created__quizz">
                      <h3>Bài trắc nghiệm đã tạo</h3>
                        <div className="row number__quizz__created">
                        {createdQuizz.map((created,index) =>{
                            return  <div className="col-6 col-sm-6 col-md-3 col-lg-2 status__quizz">
                                <button><Link to={`/quizz/edit/${created._id}`}>Bài {index+1}</Link></button>
                                <FontAwesomeIcon onClick={ () => hanleClickActive(created._id)} style={{color:'green',display:created.active ? 'block' : ' none'}}  icon={faToggleOn}></FontAwesomeIcon>
                                <FontAwesomeIcon onClick={ () => hanleClickActive(created._id)} style={{color:'red',display:created.active ? 'none' : ' block'}} icon={faToggleOff}></FontAwesomeIcon>
                            </div>
                        })}
                        </div>
                    
                  </div>

                </div>
            </div>
        </div>
    );
}

export default DetailCourse;