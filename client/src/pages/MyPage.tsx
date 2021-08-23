import React from 'react'
import MyContent from '@components/MyPage/MyContent'
import { RouteComponentProps } from 'react-router'

const MyPage: React.FC<RouteComponentProps> = (props) => {
    return (
        <MyContent {...props} />
    )
}

export default MyPage