import React, { Component } from 'react';
import SignInForm from '../auth/SignInForm';
import SignUpForm from '../auth/SignUpForm';
import { Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { moduleName, signUp } from '../../ducks/auth';
import Loader from '../common/Loader';

class AuthPage extends Component {
  render() {
    const {loading} = this.props;
    return (
      <div>
        <h1>Auth page</h1>
        <NavLink to='/auth/signIn' activeStyle={{color: 'red'}}>sign in</NavLink>
        <NavLink to='/auth/signUp' activeStyle={{color: 'red'}}>sign up</NavLink>
        <Route path='/auth/signIn' render={() => <SignInForm onSubmit={this.handleSignIn}/>}/>
        <Route path='/auth/signUp' render={() => <SignUpForm onSubmit={this.handleSignUp}/>}/>
        {loading && <Loader/>}
      </div>
    );
  }

  handleSignIn = (values) => console.log('_______', values);
  handleSignUp = ({email, password}) => this.props.signUp(email, password)
}

export default connect(state => ({
  loading: state[moduleName].loading
}), {signUp})(AuthPage);
