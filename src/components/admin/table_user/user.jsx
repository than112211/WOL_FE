import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import { Table,Button } from 'reactstrap';
import bcrypt from 'bcryptjs'
import './user.scss'
import { useForm } from "react-hook-form";
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLock,faTrash,faEdit,faUnlockAlt} from '@fortawesome/free-solid-svg-icons'
import {BrowserRouter as Router,Switch, Route,Redirect,Link} from "react-router-dom";

TableUser.propTypes = {
    
};

function TableUser(props) {
    const { register, handleSubmit, errors } = useForm();
    const [user,setUser] = useState([])
    const [modal, setModal] = useState(false);
  const toggle = (id) => {
    setModal(!modal)
    setID(id)
  };
  const [modalLock, setModalLock] = useState(false);
  const toggleLock = (id = null) => {
    setModalLock(!modalLock)
    setID(id)
  };
  const [modalunLock, setModalunLock] = useState(false);
  const toggleunLock = (id = null) => {
    setModalunLock(!modalunLock)
    setID(id)
  };
  const [modalEditDetailUser,setmodalEditDetailUser] = useState(false)
  const toggleEditDetailUser = (user = {}) => {
      setmodalEditDetailUser(!modalEditDetailUser)
      setDetailUser(user)
  }
  const [detailUser,setDetailUser]  = useState({})
    const [dropdownSearch, setdropSearch] = useState(false);
    const toggleSearch = () => setdropSearch(!dropdownSearch);
    const [dropdownReport, setdropReport] = useState(false);
    const [choose,setChoose] = useState(true)
    const toggleReport = () => setdropReport(!dropdownReport);
    const [id,setID] = useState('')
    console.log(detailUser.ban)
    const handleDeleteAccount = (id) => {
        const url = 'http://localhost:8080/admin/user/delete';
        const option = {
            method : 'POST',
            mode : 'cors',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({id:id})
        }
        fetch(url,option)
        .then(response => response.json())
        .then(data => {
            alert(data)
            toggle()
        })
    }
    useEffect(() => {
        function getUser() {
                const url = `http://localhost:8080/admin/user/all`;
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
                setUser(data);
                console.log(data)
                })
        }
        getUser();
    },[])

    function handleFilterAsc(){
      let newUser =   user.sort((a,b) => a.reported - b.reported)
      setUser(newUser)
    }
    function handleFilterDesc() {
        let newUser = user.sort((a,b) => b.reported - a.reported)
        setUser(newUser)
    }
    function handleChooseEmail() {
        if(choose !== false) {
            setChoose(false)
        }
    }
    function handleChooseID(){
        if(choose !== true) {
            setChoose(true)
        }
    }
    function onSubmit(event){
        const url = `http://localhost:8080/admin/user/search${event.text_search ? `?name=${event.text_search}` : ``}`;
        const option = {
            method : 'POST',
            mode : 'cors',
            headers: {
                'Content-Type' : 'application/json',
            },
            body:JSON.stringify({type:choose})
        }
        fetch(url,option)
        .then(response => response.json())
        .then(data => {
            setUser(data);
        })
    }
    function onSubmitLock(event) {
        const url = `http://localhost:8080/admin/ban`;
                const option = {
                    method : 'POST',
                    mode : 'cors',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({
                        id:id,
                        day:event.day
                    })
                }
                fetch(url,option)
                .then(response => response.json())
                .then(data => {
                    alert(data)
                    toggleLock()
                })

    }
    function handleUnlockAccount(id) {
        const url = `http://localhost:8080/admin/unlock`;
                const option = {
                    method : 'POST',
                    mode : 'cors',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({
                        id:id,                    })
                }
                fetch(url,option)
                .then(response => response.json())
                .then(data => {
                    alert(data)
                    toggleunLock()
                })
    }
    function onSubmitEditUser(event) {
        console.log(event)
        const url = `http://localhost:8080/admin/edit/${detailUser._id}`;
        const option = {
            method : 'POST',
            mode : 'cors',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                email:event.email,
                coin:event.coin,
                lock:event.lock == 'lock' ? true : false,
                password:event.password,
                phone:event.phone
            })
        }
        fetch(url,option)
        .then(response => response.json())
        .then(data => {
            alert(data)
            toggleEditDetailUser()
        })
    }
    return (
        <div className="table__user">
               <Modal isOpen={modalEditDetailUser} toggle={toggleEditDetailUser} >
            <form onSubmit={handleSubmit(onSubmitEditUser)}>
                <ModalHeader toggle={toggleEditDetailUser} >Ch???nh s???a ng?????i d??ng</ModalHeader>
                <ModalBody className="lecture__info">
                    <label htmlFor="">Email</label>
                      <input name="email" ref={register} defaultValue={detailUser.email} />  

                      <label htmlFor="">Phone</label>
                      <input name="phone" ref={register} defaultValue={detailUser.phone}  />
                      <label htmlFor="">M???t kh???u</label>
                      <input name="password" ref={register} defaultValue={detailUser.password}  />
                      
                      <label htmlFor="">Coin</label>
                      <input name="coin" type="number"ref={register} defaultValue={detailUser.coin} />  
                   
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" type="submit" >C???p nh???t</Button>{' '}
                  <Button color="secondary" onClick={toggleEditDetailUser}>H???y</Button>
                </ModalFooter>
            </form>
          </Modal>
            <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>X??a t??i kho???n</ModalHeader>
        <ModalBody>
            B???n c?? mu???n x??a t??i kho???n n??y ?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => handleDeleteAccount(id)}>?????ng ??</Button>{' '}
          <Button color="secondary" onClick={toggle}>H???y</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalunLock} toggle={toggleunLock} >
        <ModalHeader toggle={toggleunLock}>M??? kh??a t??i kho???n</ModalHeader>
        <ModalBody>
            B???n c?? mu???n m??? kh??a t??i kho???n n??y ?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => handleUnlockAccount(id)}>?????ng ??</Button>{' '}
          <Button color="secondary" onClick={toggleunLock}>H???y</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalLock} toggle={toggleLock} >
      <form  onSubmit={handleSubmit(onSubmitLock)}>

        <ModalHeader toggle={toggleLock}>Kh??a t??i kho???n</ModalHeader>
        <ModalBody>
        <fieldset id="payment">
                        <div className="recharge">
                            <input ref={register} type="radio" value="7" name="day" checked id="7"/>
                            <label htmlFor="7">7 ng??y</label>
                        </div>
                        <div className="recharge">
                            <input ref={register} type="radio" value="14" name="day" id="14"/>

                            <label htmlFor="14">14 ng??y</label>
                        </div>
                        <div className="recharge">
                            <input ref={register} type="radio" value="30" name="day" id="30"/>
                            <label htmlFor="30">30 ng??y</label>
                        </div>
                      </fieldset>
               
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">?????ng ??</Button>
          <Button color="secondary" onClick={toggleLock}>H???y</Button>
        </ModalFooter>
        </form>

      </Modal>
            <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="filter__admin">
                <div className="search__admin">
                <input ref={register} placeholder="T??m ki???m..." name="text_search" type="text" />
                    <ButtonDropdown isOpen={dropdownSearch} toggle={toggleSearch}>
                        <DropdownToggle caret>
                            {choose ? 'ID' : 'Email'}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem  onClick={handleChooseID}>ID</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={handleChooseEmail}>Email</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                <Button type="submit" color="primary">Search</Button>
                </div>
                <div className="filter__reported">
                <ButtonDropdown isOpen={dropdownReport} toggle={toggleReport}>
                        <DropdownToggle caret>
                            Reported
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={handleFilterAsc}>T??ng d???n</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={handleFilterDesc}>Giam d???n</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                </div>
            </div>
            </form>

            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Reported</th>
                    <th>Edit User</th>
                    </tr>
                </thead>
                <tbody>
                   {user.map((user,index) => {
                       return  <tr>
                       <th scope="row">{index+1}</th>
                       <td>{user._id}</td>
                       <td>{user.name}</td>
                       <td>{user.role ? 'Learner' : 'Talker'}</td>
                       <td>{user.email}</td>
                       <td>{user.phone}</td>
                       <td><Link to={`/admin/${user._id}/${user.role}`}>{user.reported}</Link></td>
                       <td className="icon-group">
                           <FontAwesomeIcon className="icon-lock" icon={faUnlockAlt} style={{display:user.ban.baned ? 'none' : 'block'}} onClick={() => toggleLock(user._id)}></FontAwesomeIcon>
                           <FontAwesomeIcon className="icon-unlock" icon={faLock} style={{display:user.ban.baned ? 'block' : 'none'}} onClick={() => toggleunLock(user._id)}></FontAwesomeIcon>
                           <FontAwesomeIcon className="icon-edit"icon={faEdit} onClick={() => toggleEditDetailUser(user)}></FontAwesomeIcon>
                           <FontAwesomeIcon className="icon-delete" icon={faTrash} onClick={() => toggle(user._id)}></FontAwesomeIcon>

                        </td>
                       </tr>
                   })}
                
                </tbody>
            </Table>
        </div>
        </div>
    );
}

export default TableUser;