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
import { useParams } from 'react-router';
library.add(fas,faEdit)

User.propTypes = {
    
};
function User(props) {
    const id = useParams()
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
                const url = `http://localhost:8080/user/detail/${id.id}`;
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
                setUserinfo(data);
                console.log('Success:', data);
                })
        }
        getUserInfo();
    },[status,id])
 
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
                            <FontAwesomeIcon style={{display: localStorage.getItem('token') == userinfo.token ? 'block' : 'none'}} className="icon_edit_avatar" onClick={toggleAvartar} icon={faEdit}></FontAwesomeIcon>
                        </div>
                        <div className="content__infouser">
                            <h1>{userinfo.name}</h1>
                            <p>Gi???i t??nh : {userinfo.gender? 'Nam' : 'N???'}</p>
                            <p>S??? ??i???n tho???i :{userinfo.phone}</p>
                            <div className="follow__coin">
                                <div className="follow__user">
                                    L?????t theo d??i : {userinfo.follow}
                                </div>
                                <div className="coin__user" style={{display: localStorage.getItem('token') == userinfo.token ? 'block' : 'none'}}>
                                    S??? d?? : {userinfo.coin}
                                </div>
                            </div>
                        </div>
                        <div className="btn__change" style={{display: localStorage.getItem('token') == userinfo.token ? 'block' : 'none'}}>
                            <button onClick={toggleEditInfo}>Ch???nh s???a h??? s??</button>
                            <button onClick={togglePassword}>?????i m???t kh???u</button>
                        </div>

                    </div>
                </div>
           </div>
           <div className="row">
               <div className="col-12 col-sm-12">
                  <div className="description__user">
                  <h1>M?? t???</h1>
                   <p ></p>
                  </div>
               </div>
           </div>
           <div className="row statistic">
                <div className="col-8 col-sm-8">
                    <h1 className="statistic__title">Th???ng k??</h1>
                    <div className="row">
                        <div className="col-6 col-sm-6">
                            <div className="statistic__card posted" >
                                B??i ???? ????ng:
                            </div>
                        </div>
                        <div className="col-6 col-sm-6" style={{display: localStorage.getItem('token') == userinfo.token ? 'block' : 'none'}}>
                            <div className="statistic__card revenue">
                                Doanh thu: 
                            </div>
                        </div>
                        <div className="col-6 col-sm-6">
                            <div className="statistic__card like">
                                L?????t like: 
                            </div>
                        </div>
                        <div className="col-6 col-sm-6">
                            <div className="statistic__card dislike">
                                L?????t dislike
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="col-4 col-sm-4">
                <h1 className="statistic__title">??ang theo d??i</h1>

                    <div className="following">
                        
                    </div>
                </div>
           </div>
       </div>
       </div>
    );
}

export default User;