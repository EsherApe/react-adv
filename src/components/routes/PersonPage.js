import React, { Component } from 'react';
import {connect} from 'react-redux';
import NewPersonForm from '../people/NewPersonForm';
import { addPerson, fetchPersons, personListSelector } from "../../ducks/people";
import PersonsTable from "../people/PersonsTable";

class PersonPage extends Component {
  componentDidMount() {
    this.props.fetchPersons();
  }

  render() {
    return (
      <div>
        <h2>Add new person</h2>
        <NewPersonForm onSubmit={this.props.addPerson}/>
        <PersonsTable persons={this.props.persons}/>
      </div>
    );
  }
}

export default connect(state => ({
  persons: personListSelector(state)
}), {addPerson, fetchPersons})(PersonPage);
