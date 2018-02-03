import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import customFormInfo from './customFormInfo_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  customFormInfo: customFormInfo
});

export default rootReducer;
