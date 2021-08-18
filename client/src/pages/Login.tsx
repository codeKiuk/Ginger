import React, { Suspense, useEffect } from 'react';
const LoginForm = React.lazy(() => import('@components/Login/LoginForm'))

export const Login: React.FC<{}> = () => {

    return (
        <Suspense fallback={<div>loading...</div>}>
            <LoginForm />
        </Suspense>
    );
}