import React from 'react';

import SignIn from '../../components/sign-in/sign-in.component';
import './sign-in-page.styles.css'

const SignInPage = () => {
    return (
        <div className='container'>
        <h2>SIGN IN</h2>
            <SignIn />
        </div>
    );
};

export default SignInPage;