import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import {
  FormGroup,
  Button
} from 'react-bootstrap';
import {renderField} from './renderField';
import {Link, Redirect} from 'react-router-dom';
import {testEmail, canNavToNext} from '../utils';

class TechnicalContact2 extends Component {

  handleBackClick() {
    this.props.history.push('/clientContactForm/technicalContact1')
  }

  render() {
    if (!this.props.form.hasOwnProperty('TechnicalContact1')){
      return <Redirect to="/clientContactForm/" />
    }
    let {TechnicalContact2} = this.props.form;
    let canMove = canNavToNext(TechnicalContact2, validate);
    return (<div className="Container">
      <h2 className="Title">Secondary Technical Contact</h2>
        <p>
          Secondary point of contact that is typically an employee of the client.
        </p>
      <form>
        <FormGroup controlId="formBasicText">
          <Field className="glyphicon glyphicon-user" name="technicalContact2firstName" placeholder="Contact's First Name" component={renderField}/>
          <Field className="glyphicon glyphicon-user" name="technicalContact2lastName" placeholder="Contact's Last Name" component={renderField}/>
          <Field className="glyphicon glyphicon-envelope" name="technicalContact2email" placeholder="Contact's Email" component={renderField}/>
          <Field className="glyphicon glyphicon-phone" name="technicalContact2Phone" placeholder="Contact's Primary Phone" component={renderField}/>
          <Field className="glyphicon glyphicon-briefcase" name="technicalContact2JobTitle" placeholder="Contact's Job Title" component={renderField}/>
        </FormGroup>
      </form>
      <div className="ButtonContainer">
        <Button className="StandardButton" onClick={this.handleBackClick.bind(this)}>
          Back
        </Button>
        {
          canMove
            ? <Link to="/clientContactForm/technicalContact3" className="StandardButton" style={{
                background: "#DD8E38"
              }}>Another user?</Link>
          :
          <div className="StandardButton" style={{
              background: "#DD8E38"}}>Another user?</div >
        }
        {
          canMove
            ? <Link to="/clientContactForm/additionalUserEmail" className="StandardButton">
                Next
              </Link>
            : <div className="StandardButton">Next</div>
        }
      </div>
    </div>);
  }
}

const validate = (values) => {
  let errors = {};
  if (!values.technicalContact2firstName)
    errors.technicalContact2firstName = "Please enter legal First Name";
  if (!values.technicalContact2lastName)
    errors.technicalContact2lastName = "Please enter legal Last Name";
  if (!testEmail(values.technicalContact2email))
    errors.technicalContact2email = "Please enter valid email";
  if (!values.technicalContact2Phone)
    errors.technicalContact2Phone = "Please enter valid ten digit phone number";
    return errors;
}

const mapStateToProps = (state) => {
  const {form} = state;
  return {form};
}

export default reduxForm({validate, destroyOnUnmount: false, form: 'TechnicalContact2'}
)(
  connect(mapStateToProps)(TechnicalContact2));
