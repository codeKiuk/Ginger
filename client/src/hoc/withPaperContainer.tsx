import { useAppDispatch, useAppSelector } from '@redux/hooks'
import React, { useEffect } from 'react'
import { ContentSubject } from '@redux/modules/commons/contentMenu'
import { ContentPaper } from '../components/commons/ContentPaper'
import { Loading } from '../components/commons/Loading'
import { CommentPaper } from '@components/commons/CommentPaper'
import { Profile } from '@components/MyPage/sections/Profile'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Pagination from '@material-ui/lab/Pagination'
import { RouteComponentProps } from 'react-router'

export const withPaperContainer = (route: string, contentSubject: ContentSubject): React.FC<RouteComponentProps> => {

    const PaperContainer: React.FC<RouteComponentProps> = (props) => {

        const loading = useAppSelector(state => state.contents.loading);
        const clubContents = useAppSelector(state => state.contents.clubContents);
        const groupContents = useAppSelector(state => state.contents.groupContents);
        const myContents = useAppSelector(state => state.myContents.contents);
        const myComments = useAppSelector(state => state.myComments.comments);

        const renderContents = (contents: Array<Object>) => {

            return (
                contents
                    ?
                    <List>
                        {contents.map(content =>
                            <ListItem>
                                <ContentPaper {...content} {...props} />
                            </ListItem>
                        )}
                    </List>
                    :
                    <Loading />
            )

        }

        const renderMyComments = (comments: Array<Object>) => {
            return (
                comments
                    ?
                    <List>
                        {comments.map(comment =>
                            <ListItem>
                                <CommentPaper {...comment} {...props} />
                            </ListItem>
                        )}
                    </List>
                    :
                    <Loading />
            )
        }

        const renderPapers = () => {

            switch (contentSubject) {

                case ContentSubject.CLUB_CONTENT:
                    return renderContents(clubContents);

                case ContentSubject.GROUP_CONTENT:
                    return renderContents(groupContents);

                case ContentSubject.MY_CONTENT:
                    return renderContents(myContents);

                case ContentSubject.MY_COMMENT:
                    return renderMyComments(myComments);

                default:
                    break;
            }
        }

        return (
            <>
                <div style={{
                    width: '80vw', height: '750px',
                    backgroundColor: 'whitesmoke',
                    marginTop: '100px', overflow: 'auto',
                }}>
                    {loading && <Loading />}
                    {!loading && renderPapers()}
                </div>
                <br />
                <Pagination />
            </>
        )
    }

    return PaperContainer
}