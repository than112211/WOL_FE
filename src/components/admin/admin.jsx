import React from 'react';
import PropTypes from 'prop-types';
import Header from './header/header';
import User from './table_user/user'
import Report from './table_report/report'
import './admin.scss'
import {BrowserRouter as Router,Switch, Route,Redirect} from "react-router-dom";

Admin.propTypes = {
    
};

function Admin(props) {
    return (
        <div>
            <Header></Header>
            <div className="content__admin">
                <Router>
        <Switch>
            <Route exact path="/admin/:id/:role" >
                   <Report></Report>
            </Route>
            <Route exact path="/admin" >
            <User></User>

            </Route>
           
      </Switch>
    </Router>
            </div>
        </div>
    );
}

export default Admin;