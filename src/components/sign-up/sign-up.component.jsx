import React, { Component } from 'react';
import axios from 'axios';


import MyTextField from '../my-text-field/my-text-field';
import MyButton from '../my-button/my-button';
import { connect } from 'react-redux'
import './sign-up.styles.css'





class SignUp extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            fullName: '',
            password: '',
            rePassword: '',
            email: '',
            type: '',
            isPasswordError: false,
            helperText: ''
        }

    }
    handleChange = event => {
        const {value, name} = event.target;
        this.setState({ [name]: value}, () =>
            {
                if (name==='rePassword' || name === 'password'){
                    if(this.state.password !== this.state.rePassword){
                        this.setState({
                            isPasswordError: true,
                            helperText: 'Password does not match'
                        });
                    }
                    else {
                      this.setState({
                          isPasswordError: false,
                          helperText: ''
                      });
                    }  
                  }
            });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const config = {
            headers: {
              Authorization: this.props.currentUser.userToken,
            }
          }
        const data = {
            FullName: this.state.fullName,
            Email: this.state.email,
            Password: this.state.password,
            Type: this.state.type
        }

        axios.post( 'http://192.168.43.81:9999/user/signup', data, config)
            .then((res) => {
                console.log(res);
            
            })
            .catch((error) => {
                console.log(error.response.data);


            });
    }

    render() {
        const { fullName, password, email, type, rePassword, isPasswordError, helperText } = this.state;
        return (
            <div className='sign-up'>
            <form onSubmit={this.handleSubmit} >
                    <MyTextField 
                        className='col-4 col-s-4'
                        name='fullName'
                        type='text'
                        onChange={this.handleChange}
                        value={fullName}
                        label='FULL NAME'
                    />
                    <MyTextField 
                        className='col-4 col-s-4'
                        name='email'
                        type='email'
                        onChange={this.handleChange}
                        value={email}
                        label='EMAIL'
                    />
                    <MyTextField 
                        className='col-4 col-s-4'
                        name="password" 
                        type="password" 
                        onChange={this.handleChange} 
                        value={password} 
                        label='PASSWORD'
                    />
                    <MyTextField 
                        className='col-4 col-s-4'
                        name='rePassword'
                        type='text'
                        onChange={this.handleChange}
                        value={rePassword}
                        label='RE-ENTER-PASSWORD'
                        helperText={helperText}
                        error={isPasswordError}
                    />
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