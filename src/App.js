import React from 'react';
import { connect } from 'react-redux';
import { Switch , Route, Redirect } from 'react-router-dom'
import './App.css';
import BillingPage from './pages/billing-page/billing-page'
import Header from './components/header/header.component'
import SignInPage from './pages/sign-in-page/sign-in-page';
import PurchasePage from './pages/purchase-page/purchase-page'
import StockPage from './pages/stock-page/stock-page'
import SignUpPage from './pages/sign-up-page/sign-up-page';
import AddItemPage from './pages/add-item-page/add-item-page';

class App extends React.Component {
// componentWillUnmount() {
//   myStopFunction();
// }


 render(){   
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' render={() => !this.props.currentUser ? (<Redirect to='/signin' />) : (<BillingPage />) } /> 
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInPage />) } /> 
          <Route exact path='/purchase' render={() => this.props.currentUser && this.props.currentUser.Type === 'a' ? 
            (<PurchasePage />) : (<Redirect to='/' />) } /> 
          <Route exact path='/stock' render={() => this.props.currentUser && this.props.currentUser.Type === 'a' ? 
            (<StockPage />) : (<Redirect to='/' />) } />
          <Route exact path='/signup' render={() => this.props.currentUser && this.props.currentUser.Type === 'a' ? 
            (<SignUpPage />) : (<Redirect to='/' />) } />  
          <Route exact path='/additem' render={() => this.props.currentUser && this.props.currentUser.Type === 'a' ? 
            (<AddItemPage />) : (<Redirect to='/' />) } />
        </Switch>
      </div>
    );
  }
}


const mapSateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapSateToProps)(App);
