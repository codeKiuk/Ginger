import { RegisterForm } from '@components/Register/RegisterForm'
import React from 'react'
import { RouteComponentProps } from 'react-router'

export const Register: React.FC<RouteComponentProps> = (props) => {
    return (
        <RegisterForm {...props} />
    )
}

export default Register