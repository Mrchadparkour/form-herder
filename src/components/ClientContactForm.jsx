import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { FormGroup, FormControl} from 'react-bootstrap';
import {renderField} from './renderField';
import {Link, Redirect} from 'react-router-dom';
import {testEmail, canNavToNext} from '../utils';
import { updateStoretype } from '../actions';

class ClientContactSheet extends Component {

  handleChange(e) {
    this.props.updateStoretype(e.target.value);
  }

  handleBackClick() {
    this.props.history.push('/client-setup/')
  }

  render() {
    if (!this.props.form.hasOwnProperty('emailCompany')){
      return <Redirect to="/client-setup/" />
    }
    let { clientContactForm } = this.props.form;
    let canMove = canNavToNext(clientContactForm, validate);

    return (
      <div className='Container'>
          <h2 className='Title'>Account Manager Info</h2>
          <p>The person representing the BlendedMarket service.</p>
          <form onSubmit={() => alert('submitted')}>
            <FormGroup controlId="formBasicText">
              <Field
                className="glyphicon glyphicon-envelope"
                name="accountMangaerEmail"
                placeholder="The Account Manager's Email"
                component={renderField}
                />
              <Field
                className="glyphicon glyphicon-user"
                name="accountManagerName"
                placeholder="Full legal name of Account Manager"
                component={renderField}
              />
              <Field
                className="glyphicon glyphicon-briefcase"
                name="accountManagerCompanyName"
                placeholder="Your Company"
                component={renderField}
              />
              <div className='DropDownInput'>
                <div className="Icon glyphicon glyphicon-list-alt"/>
                <FormControl className='form_control' componentClass="select" placeholder="Choose store type.">
                  <option className='Option' value="distrubutor">Choose store type.</option>
                  <option className='Option' value="distrubutor">Distrubutor</option>
                  <option className='Option' value="receiver">Store/Chain</option>
                </FormControl>
              </div>
            </FormGroup>
          </form>
          <div className='ButtonContainer'>
            <button className="StandardButton" onClick={this.handleBackClick.bind(this)}>
              Back
            </button>
            {
              canMove ?
              <Link to="/clientContactForm/technicalContact1" className="StandardButton">
                Next
              </Link>
              :
              <div className="StandardButton">Next</div>
            }
          </div>
    </div>);
  }
}

const validate = (values) => {
  const errors = {};
  //add checks here
  if (!testEmail(values.accountMangaerEmail)) errors.accountManagerEmail = "Please enter a valid email address.";
  if (!values.accountManagerCompanyName) errors.accountManagerCompanyName = "Please enter the company name";
  return errors;
}


const mapStateToProps = (state) => {
  const { form } = state;
  return { form };
}

export default reduxForm({
  validate,
  destroyOnUnmount: false,
  form: 'clientContactForm'
})(
  connect(mapStateToProps, { updateStoretype })(ClientContactSheet)
);
