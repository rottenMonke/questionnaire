import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './static/styles/main.less';
import { Provider } from 'react-redux';
import reducer from './reducers';
import store from './store';


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('app'));

