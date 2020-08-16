import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';


import MyPasswordField from '../my-password-field/my-password-field'
import MyTextField from '../my-text-field/my-text-field';
import MyButton from '../my-button/my-button';


import { setCurrentUser } from '../../redux/user/user.actions';
import { req } from '../../url/url'


import './sign-in.styles.css';


class SignIn extends Component {

    
    constructor() {
        
        super();
        
        this.state = {

            userName        : '',
            password        : '',
            isPasswordError : false,
            helperText      : '',
            
        }

    }


    handleChange = event => {

        const { value, name } = event.target;
        this.setState( { [name]: value } );

    }
   

    handleSubmit = async () => {

        const { setCurrentUser } = this.props;
        const signinData = {

            Email    : this.state.userName,
            Password : this.state.password,

        }
        
        try {

            const res = await req.user.login( signinData );

            axios.defaults.headers.common['Authorization'] = res.AccessToken;
            setCurrentUser({ Type: res.Type });
            
        } 
        catch (error) {

            this.setState ({ isPasswordError: true });

        }
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


export default connect( null, mapDispatchToProps )( SignIn );