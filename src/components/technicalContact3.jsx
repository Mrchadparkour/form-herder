import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {
  FormGroup,
  Button
} from 'react-bootstrap';
import {renderField} from './renderField';
import {testEmail, canNavToNext} from '../utils';
import {Link, Redirect} from 'react-router-dom';



class TechnicalContact3 extends Component {

  handleBackClick() {
    this.props.history.push('/clientContactForm/technicalContact2')
  }

  render() {
    if (!this.props.form.hasOwnProperty('TechnicalContact2')){
      return <Redirect to="/clientContactForm/" />
    }
    let {TechnicalContact3} = this.props.form;
    let canMove = canNavToNext(TechnicalContact3, validate);
    return (<div className="Container">
      <h2 className="Title">Tertiary Technical Contact</h2>
        <p>
          Final point of contact that is typically an employee of the client.
        </p>
      <form>
        <FormGroup controlId="formBasicText">
          <Field className="glyphicon glyphicon-user" name="technicalContact3firstName" placeholder="Contact's First Name" component={renderField}/>
          <Field className="glyphicon glyphicon-user" name="technicalContact3lastName" placeholder="Contact's Last Name" component={renderField}/>
          <Field className="glyphicon glyphicon-envelope" name="technicalContact3email" placeholder="Contact's Email" component={renderField}/>
          <Field className="glyphicon glyphicon-phone" name="technicalContact3Phone" placeholder="Contact's Primary Phone" component={renderField}/>
          <Field className="glyphicon glyphicon-briefcase" name="technicalContact3JobTitle" placeholder="Contact's Job Title" component={renderField}/>
        </FormGroup>
      </form>
      <div className="ButtonContainer">
        <Button className="StandardButton" onClick={this.handleBackClick.bind(this)}>
          Back
        </Button>
        {
          canMove
            ? <Link to="/clientContactForm/additionalUserEmail" className="StandardButton">
                Next
              </Link>
            : <div className="StandardButton">Next</div>
        }      </div>
    </div>);
  }
}

const validate = (values) => {
  let errors = {};
  if (!values.technicalContact3firstName)
    errors.technicalContact3firstName = "Please enter legal First Name";
  if (!values.technicalContact3lastName)
    errors.technicalContact3lastName = "Please enter legal Last Name";
  if (!testEmail(values.technicalContact3email))
    errors.technicalContact3email = "Please enter valid email";
  if (!values.technicalContact3Phone)
    errors.technicalContact3Phone = "Please enter valid ten digit phone number";
    return errors;
}

const mapStateToProps = (state) => {
  const {form} = state;
  return {form};
}

export default reduxForm({validate, destroyOnUnmount: false, form: 'TechnicalContact3'})(
  connect(mapStateToProps)(TechnicalContact3)
);
