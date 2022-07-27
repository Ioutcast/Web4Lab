import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './api/store';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import App from './App';
import './index.css';

ReactDOM.render(
 
  <Provider store={store}>
    <App/>,
  </Provider>
 
  ,
  document.getElementById('root')
);

