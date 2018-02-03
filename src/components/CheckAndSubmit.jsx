import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { TimelineMax } from 'gsap';
import {submitAllForms} from '../actions';
import rocket from '../styles/icon-rocket.png';
import '../styles/checkAndSubmit.css'

class CheckAndSubmit extends Component {

  handleBackClick() {
    this.props.history.push('/client-setup/fileDrop')
  }

  organizeDataAndSubmit() {
    const {
      customFormInfo: {
        fileInfoArray,
        hasFilledOutClientForm,
        storetype
      },
      form
    } = this.props;
    let submitObj = {
      fileInfoArray,
      hasFilledOutClientForm,
      storetype
    };
    for (let prop in form) {
      submitObj = {
        ...submitObj,
        ...form[prop].values
      }
    }
    this.props.submitAllForms(submitObj);

    let tl2 = new TimelineMax();
    tl2.to('.Title', 1, { opacity: 0 })
       .to('.ButtonContainer', 1, { opacity: 0 }, '-=1')
       .to('p', 1, { opacity: 0 }, '-=2')
       .to('.ThankYou', 1, { opacity: 1, display: 'block'})
  }

  render() {
    if (!this.props.form.hasOwnProperty('emailCompany')){
      return <Redirect to="/client-setup/" />
    }
    return (
    <div className="Container">
      <img src={rocket} alt="Pad and Pencil" />
      <div className='Title'>Ready for next level data entry?</div>
      <div className='ThankYou Title'>Thank You.</div>
      <p className="ThankYou">You should receive a confirmation email shortly.</p>
      <p>Make sure that all forms are filled out so we can provide you with the best possible customer experience!</p>
      <a href="http://blendedmarket.com/" rel="no_opener" className="ThankYou">BlendedMarket homepage.</a>
      <div className="ButtonContainer">
        <Button className="StandardButton" onClick={this.handleBackClick.bind(this)}>
          Back
        </Button>
        <Button className="StandardButton" onClick={this.organizeDataAndSubmit.bind(this)}>
          Submit
        </Button>
      </div>
    </div>);
  }
}

const mapStateToProps = state => {
  console.log(state);
  return state;
}

export default connect(mapStateToProps, {submitAllForms})(CheckAndSubmit);
