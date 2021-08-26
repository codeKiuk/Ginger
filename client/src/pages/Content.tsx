import React from 'react'
import { RouteComponentProps } from 'react-router'
import { ContentDetail } from '@components/Home/sections/ContentDetail'

const Content: React.FC<RouteComponentProps> = (props) => {
    return (
        <ContentDetail {...props} />
    )
}

export default Content