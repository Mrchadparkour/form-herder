import {
  UPDATE_STORETYPE,
  CONFIRM_NEW_CLIENT_FORM,
  XLSX_HAS_ERRORED,
  XLSX_IS_LOADING,
  XLSX_RECEIVED,
  SUBMIT_ALL_FORMS
} from '../actions';

export default (state = {
  fileInfoArray: [],
  storetype: 'Distrubutor',
  fileCount: 0
}, action) => {
  switch (action.type) {
    case SUBMIT_ALL_FORMS:
      let newState = (action.request) ? {
        fileInfoArray: [],
        storetype: 'Distrubutor'
      } : {...state}
      return newState;
    case UPDATE_STORETYPE:
      const { storetype } = action;
      return {
        ...state,
        storetype
      }
    case CONFIRM_NEW_CLIENT_FORM:
      return {
        ...state,
        hasFilledOutClientForm: true
      }
    case XLSX_RECEIVED:
      const newArr = [...state.fileInfoArray, action.file];
      let fileCount = state.fileCount += 1;
      return {
        ...state,
        fileCount,
        fileInfoArray: newArr
      }
    case XLSX_HAS_ERRORED:
      const { hasErrored, error } = action;
      return {
        ...state,
        hasErrored,
        error
      }
    case XLSX_IS_LOADING:
      const { isLoading } = action;
      return {
        ...state,
        isLoading
      }
    default:
      return state;
  }
}
