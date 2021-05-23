import React , { useState } from 'react';
import { Button,Container } from 'reactstrap';
import './index.scss'
import SignUp from './sign_up/index'
import SignIn from './sign_in/index'
import { useHistory } from 'react-router';


function Home() {
    const history = useHistory();
    const [modalSignup, setModalSignup] = useState(false);
    const [modalSignin, setModalSignin] = useState(false);
    const toggleSignup = () => setModalSignup(!modalSignup);
    const toggleSignin = () => setModalSignin(!modalSignin);

    function hanlesubmitSignup(value) {
        const url = 'http://localhost:8080/user/register';
        const option = {
            method : 'POST',
            mode : 'cors',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(value)
        }
        
        fetch(url,option)
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        console.log(value)

    }
    function HanlesubmitSignin(value) {
        const url = 'http://localhost:8080/user/login';
        const option = {
            method : 'POST',
            mode : 'cors',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(value)
        }
        fetch(url,option)
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
            if(data.token){
                localStorage.setItem('token',data.token)
                localStorage.setItem('role',data.role)
                if(data.role)
                    history.replace('/learner')
                    else history.replace('/talker')
            }
        
        })
        
    }
    return (
        
       <div className="main">
           <div className="img_home">
           <img src="https://design.duolingo.com/images/header/illustration-shape-language.svg" alt=""/>
           </div>
       <div className="head">
       <Container>
           <SignIn toggleSignin={toggleSignin} onHanleSubmitSignin={HanlesubmitSignin} modalSignin={modalSignin}></SignIn>
            <SignUp toggleSignup={toggleSignup} onHanleSubmitSignup={hanlesubmitSignup} modalSignup={modalSignup}></SignUp>

            <header className="header">
                <h1>
                    WOL.org
                </h1>
                <ul>
                    <li><a href="#\">Về chúng tôi</a></li>
                    <li><a href="#\">Hỗ trợ</a></li>

                </ul>
                <Button onClick={toggleSignin} className="btn__login" color="primary">Đăng nhập</Button>
                <Button onClick={toggleSignup} className="btn__login" color="primary">Đăng kí</Button>

            </header>
           </Container>
       </div>
       </div>
    );
}

export default Home;