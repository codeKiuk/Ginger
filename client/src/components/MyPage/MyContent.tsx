import React from 'react'

import { Header } from '../../components/commons/Header'
import { SideBar } from '@components/commons/SideBar'
import Copyright from '@components/commons/Copyright'
import { RouteComponentProps } from 'react-router'

const MyContent: React.FC<RouteComponentProps> = (props) => {
    return (
        <div>
            <Header {...props} />
            <SideBar {...props} />
            <Copyright />
        </div>
    )
}

export default MyContent