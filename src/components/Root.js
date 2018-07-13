import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AdminPage from './routes/AdminPage';
import AuthPage from './routes/AuthPage';
import ProtectedRoute from './common/ProtectedRoute';

class Root extends Component {
  render() {
    return (
      <div>
        <Route path="/auth" component={AuthPage}/>
        <ProtectedRoute path="/admin" component={AdminPage}/>
      </div>
    );
  }
}

export default Root;
