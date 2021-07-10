import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { withRouter } from 'react-router';

import LandingPage from './../../components/LandingPage';
import SignUp from './../../components/SignUp';
import CodeConfirm from './../../components/CodeConfirm';

const Wrapper = props => {
    return (
        <div>
            <LandingPage/>
            <SignUp/>
            <CodeConfirm/>
        </div>
    )
}

export default Wrapper;

