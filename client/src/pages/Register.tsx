import { RegisterForm } from '@components/Register/RegisterForm'
import React, { Suspense } from 'react'
import { RouteComponentProps } from 'react-router'

export const Register: React.FC<RouteComponentProps> = (props) => {
    return (
        <Suspense fallback={<div>loading...</div>}>
            <RegisterForm {...props} />
        </Suspense>
    )
}