import React from 'react';
import { RouteComponentProps } from 'react-router';
import LoginForm from '@components/Login/LoginForm';

const Login: React.FC<RouteComponentProps> = (props) => {

    return (
        <LoginForm {...props} />
    );
}

export default Login