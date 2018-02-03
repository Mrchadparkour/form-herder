import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {FormGroup} from 'react-bootstrap';
import {renderField} from './renderField';
import {Link} from 'react-router-dom';
import {testEmail, canNavToNext} from '../utils';

class WizardForm_1 extends Component {

  render() {
    const { emailCompany } = this.props.form;
    const canMove = canNavToNext(emailCompany, validate);
    return (
    <div className="Container">
      <form>
        <div className='Title'>New Client Setup</div>
        <FormGroup controlId="formBasicText">
          <Field className="glyphicon glyphicon-envelope" name="email" placeholder="Email" component={renderField}/>
          <Field className="glyphicon glyphicon-briefcase" name="companyName" placeholder="Company" component={renderField}/>
        </FormGroup>
      </form>
      <div className='ButtonContainer'>
        <a href="http://blendedmarket.com/" rel="no_opener" className="StandardButton">
          Cancel
        </a>
        {
          canMove ?
          <Link to={"/clientContactForm/" } className="StandardButton">
            Next
          </Link>
          :
          <div className="StandardButton">Next</div>
        }
      </div>
    </div>);
  }
}

const mapStateToProps = (state) => {
  const { form } = state;
  return { form };
}

const validate = (values) => {
  if (!values) return false;
  const errors = {};
  //add checks here
  if (!testEmail(values.email))
    errors.email = "Please enter a valied email address.";
  if (!values.companyName)
    errors.companyName = "Please enter the company name";
  return errors;
}

export default reduxForm({validate, destroyOnUnmount: false, form: 'emailCompany'})(
  connect(mapStateToProps)(WizardForm_1));
