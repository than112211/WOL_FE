import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router,Switch, Route,Redirect,NavLink} from "react-router-dom";
import './index.scss';
import Post from './form_post/index'

SideBar.propTypes = {
    getMyCourse:PropTypes.func,
    disablePost:PropTypes.bool,
};
function SideBar(props) {
    const [modalPost, setModalPost] = useState(false);
    const togglePost = () => setModalPost(!modalPost);
    const toggleMyCourse = () => getMyCourse(true)
    const toggleMyCourseHome = () => getMyCourse(false)
    const [role,setRole] = useState()
    const {getMyCourse,disablePost} = props;

    return (
        <div className="sidebar">
         <Post togglePost={togglePost}  modalPost={modalPost}></Post>
          
            <ul>
                <li><NavLink to="/"  onClick={toggleMyCourseHome}>Trang chủ</NavLink ></li>
                <li style={{display: disablePost ? 'none':'block'}} ><NavLink to="#" onClick={togglePost}>Đăng bài</NavLink ></li>
                <li><NavLink to="#"  onClick={toggleMyCourse} >Bài học của tôi</NavLink ></li>
                <li ><NavLink to="/livestream" >Livestream</NavLink ></li>
            </ul>
        </div>
    );
}

export default SideBar;