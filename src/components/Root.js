import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AdminPage from './routes/AdminPage';
import AuthPage from './routes/AuthPage';
import PersonPage from "./routes/PersonPage";
import ProtectedRoute from './common/ProtectedRoute';

class Root extends Component {
  render() {
    return (
      <div>
        <Route path="/auth" component={AuthPage}/>
        <ProtectedRoute path="/addPerson" component={PersonPage}/>
        <ProtectedRoute path="/admin" component={AdminPage}/>
      </div>
    );
  }
}

export default Root;
