import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class UnAuthorized extends Component {
  render() {
    return (
      <div>
        <h1>Unathorized, please <Link to='/auth/signIn'>sign in</Link></h1>
      </div>
    );
  }
}

export default UnAuthorized;
