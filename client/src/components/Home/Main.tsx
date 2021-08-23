import React from 'react'
import { RouteComponentProps } from 'react-router'
import { Header } from '../commons/Header'
import Copyright from '../commons/Copyright';
import { SideBar } from '@components/commons/SideBar';

const Main: React.FC<RouteComponentProps> = (props) => {
    return (
        <div>
            <Header {...props} />
            <SideBar {...props} />
            <Copyright />
        </div>
    )
}

export default Main;