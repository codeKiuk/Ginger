import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import { store } from './redux/store';
import { withAuth } from './hoc/withAuth';
import { Home } from './pages/Home'
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { MyContents } from './pages/MyContents';
import { MyComments } from './pages/MyComments';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path='/' component={withAuth(Home, -1)} />
          <Route path='/login' component={withAuth(Login, 0)} />
          <Route path='/register' component={withAuth(Register, 0)} />
          <Route path='/me/contents' component={withAuth(MyContents, 1)} />
          <Route path='/me/comments' component={withAuth(MyComments, 1)} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
