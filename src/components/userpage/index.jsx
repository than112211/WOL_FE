import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import './index.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from '../header/index'
import ChangePassword from './form_changepass/index'
import EditInfo from  './form_edit/index'
import Avartar from './form_avatar/index'
library.add(fas,faEdit)

User.propTypes = {
    
};
function User(props) {
    const [userinfo,setUserinfo] = useState({});
    const [modalPassword, setModalPassword] = useState(false);
    const togglePassword = () => setModalPassword(!modalPassword);
    const [status,setStatus] = useState(false)
    const [modalEditInfo, setmodalEditInfo] = useState(false);
    const toggleEditInfo = () => setmodalEditInfo(!modalEditInfo);
    const [modalAvartar, setmodalAvartar] = useState(false);
    const toggleAvartar = () => setmodalAvartar(!modalAvartar);
    const toggleStatus = () => setStatus(!status);

    

    useEffect(() => {
        function getUserInfo() {
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
                setUserinfo(data);
                console.log('Success:', data);
                })
        }
        getUserInfo();
    },[status])
 
    return (
       <div className="">
           <Header></Header>
           <EditInfo toggleEditInfo={toggleEditInfo} modalEditInfo={modalEditInfo} toggleStatus={toggleStatus}></EditInfo>
           <ChangePassword togglePassword={togglePassword}  modalPassword={modalPassword}  toggleStatus={toggleStatus} ></ChangePassword>
           <Avartar toggleAvartar={toggleAvartar} modalAvartar={modalAvartar}  toggleStatus={toggleStatus}></Avartar>
           <div className="container info">
           <div className="row">
                <div className="col-12 col-sm-12">
                    <div className="user">
                        <div className="img__infouser">
                            <img src={`http://localhost:8080/${userinfo.avatar}`} alt=""/>
                            <FontAwesomeIcon className="icon_edit_avatar" onClick={toggleAvartar} icon={faEdit}></FontAwesomeIcon>
                        </div>
                        <div className="content__infouser">
                            <h1>{userinfo.name}</h1>
                            <p>Giới tính : {userinfo.gender? 'Nam' : 'Nữ'}</p>
                            <p>Số điện thoại : {userinfo.phone}</p>
                            <div className="follow__coin">
                                <div className="follow__user">
                                    Lượt theo dõi : {userinfo.follow}
                                </div>
                                <div className="coin__user">
                                    Số dư : {userinfo.coin}
                                </div>
                            </div>
                        </div>
                        <div className="btn__change">
                            <button onClick={toggleEditInfo}>Chỉnh sửa hồ sơ</button>
                            <button onClick={togglePassword}>Đổi mật khẩu</button>
                        </div>

                    </div>
                </div>
           </div>
           <div className="row">
               <div className="col-12 col-sm-12">
                  <div className="description__user">
                  <h1>Mô tả</h1>
                   <p ></p>
                  </div>
               </div>
           </div>
           <div className="row statistic">
                <div className="col-8 col-sm-8">
                    <h1 className="statistic__title">Thống kê</h1>
                    <div className="row">
                        <div className="col-6 col-sm-6">
                            <div className="statistic__card posted">
                                Bài đã đăng:
                            </div>
                        </div>
                        <div className="col-6 col-sm-6">
                            <div className="statistic__card revenue">
                                Doanh thu: 
                            </div>
                        </div>
                        <div className="col-6 col-sm-6">
                            <div className="statistic__card like">
                                Lượt like: 
                            </div>
                        </div>
                        <div className="col-6 col-sm-6">
                            <div className="statistic__card dislike">
                                Lượt dislike
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="col-4 col-sm-4">
                <h1 className="statistic__title">Đang theo dõi</h1>

                    <div className="following">
                        
                    </div>
                </div>
           </div>
       </div>
       </div>
    );
}

export default User;