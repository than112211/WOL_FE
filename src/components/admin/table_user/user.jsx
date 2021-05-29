import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import { Table,Button } from 'reactstrap';
import './user.scss'
import { useForm } from "react-hook-form";
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

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
    const [dropdownSearch, setdropSearch] = useState(false);
    const toggleSearch = () => setdropSearch(!dropdownSearch);
    const [dropdownReport, setdropReport] = useState(false);
    const [choose,setChoose] = useState(true)
    const toggleReport = () => setdropReport(!dropdownReport);
    const [id,setID] = useState('')
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
    return (
        <div className="table__user">
            <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Xóa tài khoản</ModalHeader>
        <ModalBody>
            Bạn có muốn xóa tài khoản này ?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => handleDeleteAccount(id)}>Đồng ý</Button>{' '}
          <Button color="secondary" onClick={toggle}>Hủy</Button>
        </ModalFooter>
      </Modal>
            <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="filter__admin">
                <div className="search__admin">
                <input ref={register} placeholder="Tìm kiếm..." name="text_search" type="text" />
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
                <Button type="submit" color="primary">Tìm kiếm</Button>
                </div>
                <div className="filter__reported">
                <ButtonDropdown isOpen={dropdownReport} toggle={toggleReport}>
                        <DropdownToggle caret>
                            Reported
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={handleFilterAsc}>Tăng dần</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={handleFilterDesc}>Giam dần</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                </div>
            </div>
            </form>

            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Reported</th>
                    <th>Lock</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                   {user.map((user,index) => {
                       return  <tr>
                       <th scope="row">{index+1}</th>
                       <td>{user.name}</td>
                       <td>{user.role ? 'Learner' : 'Talker'}</td>
                       <td>{user.email}</td>
                       <td>{user.phone}</td>
                       <td>{user.reported}</td>
                       <td><Button  color="primary">Khóa tài khoản</Button></td>
                       <td><Button onClick={() => toggle(user._id)} color="danger">Xóa tài khoản</Button></td>
                       </tr>
                   })}
                
                </tbody>
            </Table>
        </div>
        </div>
    );
}

export default TableUser;