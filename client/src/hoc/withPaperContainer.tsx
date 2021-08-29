import { useAppDispatch, useAppSelector } from '@redux/hooks'
import React, { useEffect } from 'react'
import { ContentSubject, setContentMenuOpen } from '@redux/modules/commons/contentMenu'
import { ContentPaper } from '../components/commons/ContentPaper'
import { Loading } from '../components/commons/Loading'
import { CommentPaper } from '@components/commons/CommentPaper'
import { Pagination } from '@components/commons/Pagination'
import { setTotalDocs } from '@redux/modules/commons/pagination'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { RouteComponentProps } from 'react-router'

export const withPaperContainer = (route: string, contentSubject: ContentSubject): React.FC<RouteComponentProps> => {

    const PaperContainer: React.FC<RouteComponentProps> = (props) => {
        const dispatch = useAppDispatch();

        const loading = useAppSelector(state => state.contents.loading);
        const clubContents = useAppSelector(state => state.contents.clubContents);
        const groupContents = useAppSelector(state => state.contents.groupContents);
        const contentsCount = useAppSelector(state => state.contents.contentsCount);
        const myContents = useAppSelector(state => state.myContents.contents);
        const myContentsCount = useAppSelector(state => state.myContents.contentsCount);
        const myComments = useAppSelector(state => state.myComments.comments);
        const myCommentsCount = useAppSelector(state => state.myComments.commentsCount);

        const isPagination = true;

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
                    console.log('contentsCount: ', contentsCount);
                    dispatch(setTotalDocs(contentsCount));
                    return renderContents(clubContents);

                case ContentSubject.GROUP_CONTENT:
                    console.log('contentsCount: ', contentsCount);
                    dispatch(setTotalDocs(contentsCount));
                    return renderContents(groupContents);

                case ContentSubject.MY_CONTENT:
                    console.log('myContentsCount: ', myContentsCount);
                    dispatch(setTotalDocs(myContentsCount));
                    return renderContents(myContents);

                case ContentSubject.MY_COMMENT:
                    console.log('myCommentsCount: ', myCommentsCount);
                    dispatch(setTotalDocs(myCommentsCount));
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
                {isPagination && <Pagination />}
            </>
        )
    }

    return PaperContainer
}