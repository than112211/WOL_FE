import React, { useState ,useEffect} from 'react';
import PropTypes from 'prop-types';
import './ban.scss'
import { Button } from 'reactstrap';
import { useHistory } from 'react-router';

Ban.propTypes = {
    
};

function Ban(props) {
    const history = useHistory()
    const [ban,setBan] = useState(false)
    function handleLogoutBan() {
        localStorage.clear();
        history.replace('/')
    }
    useEffect(() => {
        function checkBan() {
                const url =  `http://localhost:8080/admin/checkban`;
                const option = {
                    method : 'POST',
                    mode : 'cors',
                    headers: {
                        'Content-Type' : 'application/json',
                        'auth-token' : localStorage.getItem('token')
                    },
                }
                fetch(url,option)
                .then(response => response.json())
                .then(data => {
                setBan(data);
                console.log(data)
                })
        }
        checkBan();
        console.log('dddd')
    },[])
    return (
        <div>
        <div className="ban" style={{display: ban ? 'block' : 'none'}} >
            <div className="ban__content">
            <h1>Tài khoản đã bị khóa</h1>
            <Button color="danger" onClick={handleLogoutBan}>Đăng xuất</Button>
            </div>
        </div>
        </div>
    );
}

export default Ban;