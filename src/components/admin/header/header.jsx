import React,{ useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory} from 'react-router';
import './index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons'

Header.propTypes = {
    onCheckUser:PropTypes.func,
    getchangeSearch:PropTypes.func,
};


function Header(props) {
    const history = useHistory();
    const [user,setUser] = useState({})
    function onHanleLogout (){
        localStorage.clear();
        history.replace('/')
    }
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
                    console.log(data)
                setUser(data);
                })
        }
        getUser();
    },[])
   
    return (

        <header className="header">
    {
        user ?     <div className="container head">
        <div className="brand">
            <h1>WOL</h1>
        </div>
        
        <div className="coin">
            <h1>Số dư: {user.coin }</h1>
        </div>
        <div className="name__user">
            <h1>{user.name}</h1>
            <div className="info__user">
                <ul>
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