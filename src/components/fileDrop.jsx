import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {receiveXLSX} from '../actions';
import {fileDropAni} from '../utils/animators';
import {TweenMax} from 'gsap';
import '../styles/fileDrop.css';

class FileDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enable: true,
      dropMessage: 'Drop spreadsheets here.',
      display: 'none'
    }
  }

  handleModalClose() {
    this.setState({showModal: false});
  }

  componentDidMount() {
    if (!this.props.form.hasOwnProperty('emailCompany'))
      return;
    if (this.props.fileCount > 0) {
      this.setState({dropMessage: 'Have more SpreadSheets?'})
    }
    const dropZone = document.querySelector('.DropZone');
    dropZone.addEventListener('dragover', this.handleDragOver.bind(this), false);
    dropZone.addEventListener('drop', this.handleFileDrop.bind(this), false);
  }

  componentWillUnmount() {
    if (!this.props.form.hasOwnProperty('emailCompany'))
      return;
    const dropZone = document.querySelector('.DropZone');
    dropZone.removeEventListener('dragover', this.handleDragOver.bind(this), false);
    dropZone.removeEventListener('drop', this.handleFileDrop.bind(this), false);
  }

  handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    // e.dataTransfer.dropEffect = 'copy';
    TweenMax.to('a', .4, {opacity: 0})
    TweenMax.set('.DropZoneOverlay', {
      width: 0,
      borderColor: '#3e4249'
    })
    TweenMax.to('p', .5, {left: '28%'})
  }

  handleFileDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    let files = e.dataTransfer.files;
    if (files[0] !== undefined) {
      for (let i in files) {
        if (!isNaN(i)) {
          if (/.*(\.)(csv|psv|xls|xlsx)$/.test(files[i].name)) {
            this.props.receiveXLSX(files[i]);
          } else {
            this.setState({dropMessage: "Please only drop csv, xlsx, xls, or psv files"})
          }
        }
      }
    }
    //pulled animation out to '../utils/animators.js'
    fileDropAni(this);
    const dropZone = document.querySelector('.DropZone');
    dropZone.removeEventListener('dragover', this.handleDragOver.bind(this));
    dropZone.removeEventListener('drop', this.handleFileDrop.bind(this));
  }

  handleBackClick() {
    this.props.history.push('/clientContactForm/additionalUserEmail')
  }

  render() {
    if (!this.props.form.hasOwnProperty('emailCompany')){
      return <Redirect to="/client-setup/" />
    }
    return (
    <div>
      <button className="StandardButton" onClick={this.handleBackClick.bind(this)}>
        Go Back
      </button>
      <div className="DropZone">
        <p>{this.state.dropMessage}</p>
        <div className='ButtonContainer'>
          <Link to="/client-setup/0" className="StandardButton2">
            Back
          </Link>
          <Link to={"/client-setup/checkAndSubmit"} className="StandardButton2">
            Next
          </Link>
        </div>
        <div className="FileList">
          {
            this.props.fileInfoArray.map((fileInfo, i) => {
              return <div key={i}>{fileInfo.xlsxName}</div>
            })
          }
        </div>
        <div className="DropZoneOverlay">
          <Link to="/client-setup/checkAndSubmit">I don't have any.</Link>
        </div>
      </div>
    </div>);
  }
}

const mapStateToProps = (state) => {
  const {
    customFormInfo: {
      fileCount,
      fileInfoArray
    },
    form
  } = state;
  return {fileCount, fileInfoArray, form};
}

export default connect(mapStateToProps, {receiveXLSX})(FileDrop);
