import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ApolloContext, client } from './ApolloContext';
import App from './App';
import { store } from './store';
import './styles/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <ApolloContext.Provider value={{ client }}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ApolloContext.Provider>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);
