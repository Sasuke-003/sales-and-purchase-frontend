import React from 'react';
import { connect } from 'react-redux';
import { Switch , Route, Redirect } from 'react-router-dom'

import './App.css';
import BillingPage from './pages/billing-page/billing-page'
import Header from './components/header/header.component'
import SignInPage from './pages/sign-in-page/sign-in-page';
import PurchasePage from './pages/purchase-page/purchase-page'
import StockPage from './pages/stock-page/stock-page'

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';


class App extends React.Component {
  

  render(){
    return (
      <div className="App">
        <Header />
        <Switch>
        <Route exact path='/' render={() => !this.props.currentUser ? (<Redirect to='/signin' />) : (<BillingPage />) } /> 
        <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInPage />) } /> 
        <Route exact path='/purchase' render={() => this.props.currentUser && this.props.currentUser.userType === 'a' ? 
        (<PurchasePage />) : (<Redirect to='/' />) } /> 
        <Route exact path='/stock' render={() => this.props.currentUser && this.props.currentUser.userType === 'a' ? 
        (<StockPage />) : (<Redirect to='/' />) } />  
      </Switch>
      </div>
    );
  }
}

const mapSateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapSateToProps)(App);
