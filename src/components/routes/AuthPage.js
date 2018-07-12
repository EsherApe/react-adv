import React, { Component } from 'react';
import SignInForm from '../auth/SignInForm';
import SignUpForm from '../auth/SignUpForm';
import {Route, NavLink} from 'react-router-dom';

class AuthPage extends Component {
  render() {
    return (
      <div>
        <h1>Auth page</h1>
        <NavLink to='/auth/signIn' activeStyle={{color: 'red'}}>sign in</NavLink>
        <NavLink to='/auth/signUp' activeStyle={{color: 'red'}}>sign up</NavLink>
        <Route path='/auth/signIn' render={() => <SignInForm onSubmit={this.handleSignIn}/>}/>
        <Route path='/auth/signUp' render={() => <SignUpForm onSubmit={this.handleSignUp}/>}/>
      </div>
    );
  }

  handleSignIn(values) {console.log('_______', values);}
  handleSignUp(values) {console.log('_______', values);}
}

export default AuthPage;
