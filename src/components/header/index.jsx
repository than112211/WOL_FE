import React,{ useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory} from 'react-router';
import {BrowserRouter as Router,Switch, Route,Redirect,Link} from "react-router-dom";
import Payment from '../talker_page/payment/index'
import './index.scss'
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

Header.propTypes = {
    onCheckUser:PropTypes.func,
    getchangeSearch:PropTypes.func,
};


function Header(props) {
    const history = useHistory();
    const [user,setUser] = useState({})
    const [modalPayment, setmodalPayment] = useState(false);
    const togglePayment = () => setmodalPayment(!modalPayment);
    function onHanleLogout (){
        localStorage.clear();
        history.replace('/')
    }
    const {onCheckUser} = props;
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
                setUser(data);
                if(onCheckUser){
                    onCheckUser(data._id)
                }
                })
        }
        getUser();
    },[])
    function handleSubmitPayment(value){
        const url = 'http://localhost:8080/payment/create';
        const option = {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'auth-token' : localStorage.getItem('token')
                
            },
            body:JSON.stringify(value)
        }
        fetch(url,option)
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        window.location.href=data.link
            
        })
        console.log(value)

}
    function handleChangeSearch(e){
        props.getchangeSearch(e.target.value)
    }
    return (

        <header className="header">
        <Payment togglePayment={togglePayment} onHanleSubmitPayment={handleSubmitPayment} modalPayment={modalPayment}></Payment>
    {
        user ?     <div className="container head">
        <div className="brand">
            <h1>WOL</h1>
        </div>
        <div className="search">
                <input onChange={(event) => handleChangeSearch(event)}  type="text" name="" id="" placeholder="Nhập tên bài học" />
                <FontAwesomeIcon icon="search"></FontAwesomeIcon>
            </div>
        <div className="coin">
            <h1>Số dư: {user.coin }</h1>
        </div>
        <div className="img__user">
            <img src={`http://localhost:8080/${user.avatar}`} alt="" />
        </div>
        <div className="name__user">
            <h1>{user.name}</h1>
            <div className="info__user">
                <ul>
                <li><Link to="/">Trang chủ</Link></li>

                    <li><Link to={`/information/${user._id}`}>Thông tin cá nhân</Link></li>
                    <li onClick={togglePayment}>Nạp tiền</li>
                    <li>Trợ giúp & Hỗ trợ</li>
                    <li onClick={onHanleLogout}>Đăng xuất</li>
                </ul>
            </div>
        </div>
    
    </div> : <></>
    }
   </header>
    );
}

export default Header;