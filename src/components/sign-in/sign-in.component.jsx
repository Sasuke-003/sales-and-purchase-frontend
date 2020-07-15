import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/user/user.actions';
import MyTextField from '../my-text-field/my-text-field';
import MyButton from '../my-button/my-button';
import MyPasswordField from '../my-password-field/my-password-field'
import './sign-in.styles.css';


class SignIn extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            userName: 'a',
            password: 'a',
            isPasswordError: false,
            helperText:''
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
   
    handleSubmit = async () => {
        const { setCurrentUser } = this.props;

        const signinData = {
            Email   : this.state.userName,
            Password: this.state.password
        }
        axios.post ( '/user/login', signinData )
            .then  ( data  => { 
                axios.defaults.headers.common['Authorization'] = data.AccessToken ;
                setCurrentUser({ Type: data.Type }) ;
            })
            .catch ( error => { this.setState ({ isPasswordError: true }) });
    }

    render() {
        const { userName, password, isPasswordError} = this.state;
        return (
            <div className='sign-in'>
                    <MyTextField 
                        className='col-4 col-s-4'
                        name='userName'
                        type='text'
                        onChange={this.handleChange}
                        value={userName}
                        label='USERNAME'
                    />
                    <MyPasswordField 
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
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});


export default connect(null, mapDispatchToProps)(SignIn);