import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/crown.svg'
import { withRouter } from 'react-router-dom'
import './header.styles.scss';
import { connect } from 'react-redux'
import { setCurrentUser } from '../../redux/user/user.actions'
import MyButton from '../my-button/my-button'

const Header = ({ currentUser, setCurrentUser, history, match }) => {
    return (
        <div className='header'>
            <Link className='logo-container' to="/">
                <Logo className='logo' />
            </Link>
            <div className='options'>
                    {
                        currentUser ?
                            <MyButton className='option' color='primary' onClick={() => {setCurrentUser(null)}}>
                                SIGN OUT
                            </MyButton>
                        :
                            null
                    }
                    {
                        currentUser && currentUser.type === 'admin' ?
                            <Link className='option' to='/purchase'>
                                PURCHASE
                            </Link> 
                        :
                            null
                    }
                    {
                        currentUser && currentUser.type === 'admin' ?
                        <Link className='option' to='/stock'>
                            STOCK
                        </Link> 
                        :
                            null
                    }
                    
            </div>
        </div>
    );
};

const mapStatetoProps = state => ({
    currentUser: state.user.currentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStatetoProps, mapDispatchToProps)(withRouter(Header));