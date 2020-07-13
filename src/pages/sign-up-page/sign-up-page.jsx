import React from 'react';
import SignUp from '../../components/sign-up/sign-up.component'
import './sign-up-page.styles.css';

const SignUpPage = () => {
    return (
        <div className='container'>
        <h2>ADD USER</h2>
        <SignUp />
        </div>
    );
};

export default SignUpPage;