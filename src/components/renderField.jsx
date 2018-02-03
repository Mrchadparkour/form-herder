import React from 'react';
import '../styles/WizardForm1.css';

export const renderField = field => {
    const { meta:{ touched, error }} = field;
    const container = `form-group ${touched && error ? 'has-danger' : '' }`;
    const icon = `${field.className} Icon`
    return(
      <div className={ container }>

        <label>{field.label}</label>
        <p>{field.message}</p>

      <div className="InputContainer">
        <div className = { icon }></div>
        <input
          type="text"
          className="form_control"
          placeholder={field.placeholder}
          { ...field.input }
          />
      </div>
        <div style={{ color: 'white' }}>
          { touched ? error : ''}
        </div>
      </div>
    );
}
