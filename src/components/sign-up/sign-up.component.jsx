import React, { Component } from 'react';
import axios from 'axios';


import MyTextField from '../my-text-field/my-text-field';
import MyButton from '../my-button/my-button';
import { connect } from 'react-redux'
import './sign-up.styles.css'
import MyCheckBox from '../my-check-box/my-check-box';
import MyPasswordField from '../my-password-field/my-password-field'





class SignUp extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isAdmin: false,
            isPasswordError: false,
            helperText: ''
        };

    }
    handleChange = event => {
        const password = document.getElementById('filled-adornment-password').value;
        const rePassword = document.getElementById('rePassword').value;
        let error = false;
        let text = ''
        if(password !== rePassword){
                error = true;
                text = 'Password does not match';
        }
        else if (password.length < 8){
            error = true;
            text = 'Password must contain 8 or more characters';
        }
        this.setState({
                isPasswordError: error,
                helperText: text
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const config = {
            headers: {
              'Authorization': this.props.currentUser.userToken,
            }
        }
        const data = {
            FullName: document.getElementById('fullName').value,
            Email: document.getElementById('email').value,
            Password: document.getElementById('filled-adornment-password').value,
            Type: this.state.isAdmin ? 'a' : 'e'
        }
        if (!this.state.isPasswordError){
            axios.post( 'http://localhost:9999/user/signup', data, config)
            .then((res) => {
                alert("sucessfully Registered")      
            })
            .catch((error) => {
                alert(error.response.data.info)
            });
        }
        else{
            alert('password does not match')
        }
    }

    handleCheckBoxChange = (event) => {
        this.setState({
            isAdmin: event.target.checked
        });
        console.log(event.target.checked)
    }

    shouldComponentUpdate( nextProps,nextState) {
        if(nextState === this.state)
            return false
        return true
    }

    render() {
        const { isAdmin, isPasswordError, helperText  } = this.state;
        return (
            <div className='sign-up'>
            <form onSubmit={this.handleSubmit} >
                    <MyTextField 
                        className='col-4 col-s-4'
                        id='fullName'
                        type='text'
                        label='FULL NAME'
                    />
                    <MyTextField 
                        className='col-4 col-s-4'
                        id='email'
                        type='email'
                        label='EMAIL'
                    />
                     <MyPasswordField 
                        className='col-4 col-s-4'
                        name='password' 
                        type="password" 
                        onChange={this.handleChange} 
                        label='PASSWORD'
                    />
                    <MyTextField 
                        className='col-4 col-s-4'
                        id='rePassword'
                        type='text'
                        onChange={this.handleChange}
                        label='RE-ENTER-PASSWORD'
                        helperText={helperText}
                        error={isPasswordError}
                    />
                    <MyCheckBox label='ADMIN' checked={isAdmin} onChange={this.handleCheckBoxChange} name='isAdmin' />
                    <MyButton className='button' variant='contained' type='submit' color='secondary'>
                        SIGN UP
                    </MyButton>
                    </form>
            </div>
        );
    }
}

const mapStatetoProps = state => ({
    currentUser: state.user.currentUser
});


export default connect(mapStatetoProps)(SignUp);