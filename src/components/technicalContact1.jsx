import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {FormGroup, Button} from 'react-bootstrap';
import {renderField} from './renderField';
import {Link, Redirect} from 'react-router-dom';
import {testEmail, canNavToNext} from '../utils';

class TechnicalContact1 extends Component {

  handleBackClick() {
    this.props.history.push('/clientContactForm/')
  }

  render() {
    if (!this.props.form.hasOwnProperty('clientContactForm')){
      return <Redirect to="/clientContactForm/" />
    }

    let {TechnicalContact1} = this.props.form;
    let canMove = canNavToNext(TechnicalContact1, validate);
    return (<div className="Container">
      <h2 className="Title">Primary Technical Contact</h2>
        <p>
          Main point of contact that is typically an employee of the client.
        </p>
      <form>
        <FormGroup controlId="formBasicText">
          <Field className="glyphicon glyphicon-user" name="technicalContact1firstName" placeholder="Contact's First Name" component={renderField}/>
          <Field className="glyphicon glyphicon-user" name="technicalContact1lastName" placeholder="Contact's Last Name" component={renderField}/>
          <Field className="glyphicon glyphicon-envelope" name="technicalContact1email" placeholder="Contact's Email" component={renderField}/>
          <Field className="glyphicon glyphicon-phone" name="technicalContact1Phone" placeholder="Contact's Primary Phone" component={renderField}/>
          <Field className="glyphicon glyphicon-briefcase" name="technicalContact1JobTitle" placeholder="Contact's Job Title" component={renderField}/>
        </FormGroup>
      </form>
      <div className="ButtonContainer">
        <Button className="StandardButton" onClick={this.handleBackClick.bind(this)}>
          Back
        </Button>
        {
          canMove
            ? <Link to="/clientContactForm/technicalContact2" className="StandardButton" style={{
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
  const errors = {};
  if (!values.technicalContact1firstName)
    errors.technicalContact1firstName = "Please enter legal First Name";
  if (!values.technicalContact1lastName)
    errors.technicalContact1lastName = "Please enter legal Last Name";
  if (!testEmail(values.technicalContact1email))
    errors.technicalContact1email = "Please enter valid email";
  if (!values.technicalContact1Phone)
    errors.technicalContact1Phone = "Please enter valid ten digit phone number";

  //add checks here
  return errors;
}

const mapStateToProps = (state) => {
  const {form} = state;
  return {form};
}

export default reduxForm({validate, destroyOnUnmount: false, form: 'TechnicalContact1'})(connect(mapStateToProps)(TechnicalContact1));
