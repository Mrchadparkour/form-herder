import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import {
  FormGroup,
  Button
} from 'react-bootstrap';
import {renderField} from './renderField';
import {Link, Redirect} from 'react-router-dom';

class AdditionalUserEmail extends Component {

  handleBackClick() {
    this.props.history.push('/clientContactForm/technicalContact1')
  }

  render() {

    if (!this.props.form.hasOwnProperty('TechnicalContact1')){
      return <Redirect to="/clientContactForm/" />
    }
    return (<div className="Container">
      <h2 className="Title">Additional Users</h2>
      <p>If there are any other employees who may use the system and may need to contact our support team please enter them below.</p>
      <form>
        <FormGroup controlId="formBasicText">
          <Field className="glyphicon glyphicon-envelope" name="additionalUserEmail1" placeholder="First Contact Email" component={renderField}/>
          <Field className="glyphicon glyphicon-envelope" name="additionalUserEmail2" placeholder="Second Contact's Email" component={renderField}/>
          <Field className="glyphicon glyphicon-envelope" name="additionalUserEmail3" placeholder="Third Contact's Email" component={renderField}/>
          <Field className="glyphicon glyphicon-envelope" name="additionalUserEmail4" placeholder="Fourth Contact's Email" component={renderField}/>
          <Field className="glyphicon glyphicon-envelope" name="additionalUserEmail5" placeholder="Fifth Contact's Email" component={renderField}/>
          <Field className="glyphicon glyphicon-envelope" name="additionalUserEmail6" placeholder="Sixth Contact's Email" component={renderField}/>
        </FormGroup>
      </form>
      <div className="ButtonContainer">
        <Button className="StandardButton" onClick={this.handleBackClick.bind(this)}>
          Back
        </Button>
        <Link to="/client-setup/filedrop" className="StandardButton">Done!</Link>
      </div>
    </div>);
  }
}

const validate = (values) => {
  // const errors = {};
  // if (!values.)
  // add checks here
  // return errors;
}

const mapStateToProps = state => {
  const { form } = state;
  return { form };
}

export default reduxForm({validate, destroyOnUnmount: false, form: 'additionalUser'}
)(
  connect(mapStateToProps)(AdditionalUserEmail));
