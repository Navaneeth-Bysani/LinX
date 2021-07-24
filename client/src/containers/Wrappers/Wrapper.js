import React from 'react';
import {Route, Switch} from 'react-router-dom';

import LandingPage from './../../components/LandingPage';
import SignUp from './../../components/SignUp';
import Login from './../../components/Login';
import Dashboard from './../../components/Dashboard';
import CodeConfirm from './../../components/CodeConfirm';

import UserPage from './../../components/userDetails/UserDetailPage';
import AdminDashboard from './../../components/userControls/DashBoard';

const Wrapper = props => {
    return (
        <div>
            <Switch>
                <Route path = "/" exact>
                    <LandingPage/>
                </Route>
                <Route path = "/login">
                    <Login/>
                </Route>
                <Route path = "/signup">
                    <SignUp/>
                </Route>
                <Route path = "/confirmEmail">
                    <CodeConfirm/>
                </Route>
                <Route path = "/dashboard">
                    <Dashboard/>
                </Route>
                <Route path = "/admin">
                    <AdminDashboard/>
                </Route>
                <Route path = "/:userId">
                    <UserPage/>
                </Route>
                
            </Switch>
        </div>
    )
}

export default Wrapper;

