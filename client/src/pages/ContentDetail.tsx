import React from 'react'
import { RouteComponentProps } from 'react-router'
import { SingleContent } from '@components/ContentDetail/SingleContent'

const ContentDetail: React.FC<RouteComponentProps> = (props) => {
    return (
        <SingleContent {...props} />
    )
}

export default ContentDetail