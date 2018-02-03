import XLSX from 'xlsx';
import axios from 'axios';
import fileInfo from '../fileInfo/fileInfo'

export const UPDATE_STORETYPE = 'UPDATE_STORETYPE';
export const CONFIRM_NEW_CLIENT_FORM = 'CONFIRM_NEW_CLIENT_FORM';
export const XLSX_HAS_ERRORED = 'XLSX_HAS_ERRORED';
export const XLSX_IS_LOADING = 'XLSX_IS_LOADING';
export const XLSX_RECEIVED = 'XLSX_RECEIVED';
export const SUBMIT_ALL_FORMS = 'SUBMIT_ALL_FORMS';

const ROOT_URL = 'http://localhost:8080'

export const submitAllForms = (data) => {
  const request = axios.post(`${ROOT_URL}`, data);
  return {
    type: SUBMIT_ALL_FORMS,
    request
  }
}

export const updateStoretype = (storetype) => {
  return {
    type: UPDATE_STORETYPE,
    storetype
  }
}

export const confirmNewClientForm = () => {
  return {
    type: CONFIRM_NEW_CLIENT_FORM
  }
}

//purely for fetching data and dispatching xlsx action creators
//called in components/fileDrop.jsx by window DnD listeners
export const receiveXLSX = (file) => {
  return (dispatch) => {
    dispatch(xlsxIsLoading(true));
    let reader = new FileReader();
    reader.onload = (e) => {
      if (e.error) dispatch(xlsxHasErrored(true, e.error));
      let { result } = e.target;
      let buffer = window.btoa(result);
      let workbook = XLSX.read(result, {type: 'binary'});
      let fileInfoObj = new fileInfo(workbook, file.name, buffer);

      dispatch(xlsxReceived(fileInfoObj));
      dispatch(xlsxIsLoading(false));
      dispatch(xlsxHasErrored(false, ""));
    }
    reader.readAsBinaryString(file);
  }
}

export const xlsxHasErrored = (bool, error) => {
  return {
    type: XLSX_HAS_ERRORED,
    hasErrored: bool,
    error
  }
}

export const xlsxIsLoading = (bool) => {
  return {
    type: XLSX_IS_LOADING,
    isLoading: bool
  }
}

export const xlsxReceived = (file) => {
  return {
    type: XLSX_RECEIVED,
    file
  }
}

//end XLSX fetching action creators
