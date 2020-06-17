import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/user/user.actions';

import MyTextField from '../my-text-field/my-text-field';
import MyButton from '../my-button/my-button';

import './sign-in.styles.css';


class SignIn extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            userName: '',
            password: '',
            isPasswordError: false
        }

    }
    handleChange = event => {
        const {value, name} = event.target;
        if (name==='isAdmin'){
            this.setState({ [name]: event.target.checked})
        }
        else
            this.setState({ [name]: value})
    }

    handleSubmit = () => {
        const { setCurrentUser } = this.props;
        console.log('aefad')
        axios.post('http://localhost:9999/user/login', {
            Email: this.state.userName,
            Password: this.state.password
          },)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        if(!this.state.isPasswordError && !this.state.isNameError){
        setCurrentUser({
            type: 'admin',
            token: '12345'
        });
    }

        this.setState({
            password: '',
        })
    }

    render() {
        const { userName, password, isAdmin, isNameError, isPasswordError} = this.state;
        return (
            <div className='sign-in'>
                <form >
                    <MyTextField 
                        className='col-4 col-s-4'
                        name='userName'
                        type='text'
                        onChange={this.handleChange}
                        value={userName}
                        label='USERNAME'
                    />
                    <MyTextField 
                        className='col-4 col-s-4'
                        name="password" 
                        type="password" 
                        onChange={this.handleChange} 
                        value={password} 
                        label='PASSWORD'
                        error = {isPasswordError}
                    />
                    <MyButton className='button' variant='contained' type='submit' color='secondary' onClick={this.handleSubmit} >
                        SIGN IN
                    </MyButton>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});


export default connect(null, mapDispatchToProps)(SignIn);