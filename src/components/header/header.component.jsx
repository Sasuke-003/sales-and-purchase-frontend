import React from 'react';
import { withRouter } from 'react-router-dom';
import './header.styles.scss';
import { connect } from 'react-redux'
import { setCurrentUser } from '../../redux/user/user.actions'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = ({ currentUser, setCurrentUser, history}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <AppBar position='fixed'>
    <Toolbar>
      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => {history.push('/')}} >
        <HomeIcon />
      </IconButton>
      <Typography variant="h6" className={classes.title}>
        
      </Typography>
    {
        currentUser && currentUser.userType === 'a' ?
            <Button color='inherit' className='option' onClick={() => {history.push('/purchase')}}>
                PURCHASE
            </Button> 
        :
            null
    }
    {
        currentUser && currentUser.userType === 'a' ?
        <Button color='inherit' className='option' onClick={() => {history.push('/stock')}}>
            STOCK
        </Button> 
        :
            null
    }
    {
        currentUser ?
        <Button color='inherit' className='option' onClick={() => {history.push('/signup')}}>
                SIGN UP
            </Button>
        :
            null
        }
        {
          currentUser ?
              <Button color='inherit' className='option'  onClick={() => {setCurrentUser(null)}}>
                  LOG OUT
              </Button>
          :
              null
          }
    </Toolbar>
  </AppBar>
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