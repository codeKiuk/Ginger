import React, { Suspense, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
const LoginForm = React.lazy(() => import('@components/Login/LoginForm'))

export const Login: React.FC<RouteComponentProps> = (props) => {

    return (
        <Suspense fallback={<div>loading...</div>}>
            <LoginForm {...props} />
        </Suspense>
    );
}