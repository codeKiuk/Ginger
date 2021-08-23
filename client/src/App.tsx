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
const Content = React.lazy(() => import('@pages/Content'));

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/home' component={withAuth(Home, -1)} />
          <Route path='/home' component={withAuth(Content, -1)} />
          {/* /home/:contentID */}
          <Route exact path='/login' component={withAuth(Login, 0)} />
          <Route exact path='/register' component={withAuth(Register, 0)} />
          <Route path='/my-page' component={withAuth(MyPage, 1)} />
          {/* /my-page/:userID */}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
