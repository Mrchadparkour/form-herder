import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import ReduxLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import WizardForm_1 from './components/WizardForm_1';
import ClientContactForm from './components/ClientContactForm';
import TechnicalContact1 from './components/technicalContact1';
import TechnicalContact2 from './components/technicalContact2';
import TechnicalContact3 from './components/technicalContact3';
import AdditionalUserEmail from './components/additionalUserEmail';
import FileDrop from './components/fileDrop';
import CheckAndSubmit from './components/CheckAndSubmit';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
import './styles/index.css';


const middlewares = [ ReduxThunk ];

const createStoreWithMiddleWare = applyMiddleware(...middlewares)(createStore)(reducers);

render(
  <Provider store={ createStoreWithMiddleWare }>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/client-setup/checkAndSubmit" component={ CheckAndSubmit } />
          <Route path="/client-setup/filedrop" component={ FileDrop } />
          <Route path="/clientContactForm/technicalContact1" component={ TechnicalContact1 } />
          <Route path="/clientContactForm/technicalContact2" component={ TechnicalContact2 } />
          <Route path="/clientContactForm/technicalContact3" component={ TechnicalContact3 } />
          <Route path="/clientContactForm/additionalUserEmail" component={ AdditionalUserEmail } />
          <Route path="/clientContactForm" component={ ClientContactForm } />
          <Route path="/client-setup/" component={ WizardForm_1 } />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
