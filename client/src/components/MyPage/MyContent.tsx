import React, { useEffect } from 'react'

import { Header } from '../../components/commons/Header'
import { SideBar } from '@components/commons/SideBar'
import Copyright from '@components/commons/Copyright'
import { RouteComponentProps } from 'react-router'
import { withContentPaperContainer } from '@hoc/withCotentPaperContainer'
import { ContentSubject } from '@redux/modules/commons/contentMenu'
import { useAppSelector } from '@redux/hooks'

const MyContent: React.FC<RouteComponentProps> = (props) => {
    const contentSubject = useAppSelector(state => state.contentMenu.contentSubject);
    const ContentPaperContainer = withContentPaperContainer('my-page', contentSubject);


    useEffect(() => {
        switch (contentSubject) {
            case ContentSubject.MY_CONTENT:

                break;
            case ContentSubject.MY_COMMENT:

                break;
            default:
                break;
        }
    }, [contentSubject])

    return (
        <div>
            <Header {...props} />
            <ContentPaperContainer />
            <SideBar {...props} />
            <Copyright />
        </div>
    )
}

export default MyContent