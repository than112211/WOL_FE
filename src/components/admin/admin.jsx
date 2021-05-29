import React from 'react';
import PropTypes from 'prop-types';
import Header from './header/header';
import User from './table_user/user'
import './admin.scss'
Admin.propTypes = {
    
};

function Admin(props) {
    return (
        <div>
            <Header></Header>
            <div className="content__admin">
                <User></User>
            </div>
        </div>
    );
}

export default Admin;