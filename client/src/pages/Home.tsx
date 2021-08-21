import React from 'react'
import Main from '@components/Home/Main'
import { RouteComponentProps } from 'react-router'

const Home: React.FC<RouteComponentProps> = (props) => {
    return (
        <Main {...props} />
    )
}

export default Home