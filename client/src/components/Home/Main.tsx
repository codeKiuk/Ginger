import React from 'react'
import { RouteComponentProps } from 'react-router'
import { Header } from './sections/Header'
import Copyright from '../commons/Copyright';

const Main: React.FC<RouteComponentProps> = (props) => {
    return (
        <div>
            <Header {...props} />
            <Copyright />
        </div>
    )
}

export default Main;