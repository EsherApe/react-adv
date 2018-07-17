import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AdminPage from './routes/AdminPage';
import AuthPage from './routes/AuthPage';
import PersonPage from "./routes/PersonPage";
import ProtectedRoute from './common/ProtectedRoute';
import { connect } from 'react-redux';
import { moduleName, signOut } from '../ducks/auth';
import { Link } from 'react-router-dom';

class Root extends Component {
  render() {
    const {signOut, signedIn} = this.props;
    const btn = signedIn
      ? <button onClick={signOut}>Sign out</button>
      : <Link to='/auth/signIn'>Sign in</Link>;
    return (
      <div>
        {btn}
        <Route path="/auth" component={AuthPage}/>
        <ProtectedRoute path="/addPerson" component={PersonPage}/>
        <ProtectedRoute path="/admin" component={AdminPage}/>
      </div>
    );
  }
}

export default connect(state => ({
  signedIn: !!state[moduleName].user
}), {signOut}, null, {pure: false})(Root);
