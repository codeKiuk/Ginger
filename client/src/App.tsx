import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import { store } from '@redux/store';
import { withAuth } from '@hoc/withAuth';
import { Loading } from '@components/commons/Loading';

const Home = React.lazy(() => import('@pages/Home'))
const Login = React.lazy(() => import('@pages/Login'))
const Register = React.lazy(() => import('@pages/Register'))
const MyPage = React.lazy(() => import('@pages/MyPage'))
const ContentDetail = React.lazy(() => import('@pages/ContentDetail'));

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path='/home' component={withAuth(Home, -1)} />
            <Route path='/home/:contentID' component={withAuth(ContentDetail, -1)} />
            <Route exact path='/login' component={withAuth(Login, 0)} />
            <Route exact path='/register' component={withAuth(Register, 0)} />
            <Route path='/my-page/:userID' component={withAuth(MyPage, 1)} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
