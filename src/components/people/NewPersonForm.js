import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import ErrorField from "../common/ErrorField";
import { validate as validateEmail } from 'email-validator';

class NewPersonForm extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <Field name='firstName' component={ErrorField}/>
          <Field name='lastName' component={ErrorField}/>
          <Field name='email' component={ErrorField}/>
          <div>
            <input type='submit'/>
          </div>
        </form>
      </div>
    );
  }
}

function validate({firstName, lastName, email}) {
  const errors = {};
  if(!firstName) errors.firstName = 'First name is required';
  if(!lastName) errors.firstName = 'Last name is required';

  if(!email) {
    errors.email = 'Email is required';
  } else if(!validateEmail(email)) {
    errors.email = 'Email is invalid';
  }

  return errors
}

function onSubmitSuccess(result) {
  let {payload} = result;
  payload.firstName = '';
  payload.lastName = '';
  payload.email = '';
}

export default reduxForm({
  form: 'person',
  validate,
  onSubmitSuccess
})(NewPersonForm);
