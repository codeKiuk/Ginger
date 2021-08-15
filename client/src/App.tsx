import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { store } from './redux/store';
import { Test } from './pages/Test';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path='/' component={Test} />

        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
