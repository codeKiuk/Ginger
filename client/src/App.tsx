import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import { store } from '@redux/store';
import { withAuth } from '@hoc/withAuth';

const Home = React.lazy(() => import('@pages/Home'))
const Login = React.lazy(() => import('@pages/Login'))
const Register = React.lazy(() => import('@pages/Register'))
const MyPage = React.lazy(() => import('@pages/MyPage'))

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={withAuth(Home, -1)} />
          <Route exact path='/login' component={withAuth(Login, 0)} />
          <Route exact path='/register' component={withAuth(Register, 0)} />
          <Route exact path='/contents/:user' component={withAuth(MyPage, 1)} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
