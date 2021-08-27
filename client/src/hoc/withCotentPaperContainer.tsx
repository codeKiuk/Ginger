import { useAppDispatch, useAppSelector } from '@redux/hooks'
import React, { useEffect } from 'react'
import { ContentSubject } from '@redux/modules/commons/contentMenu'
import { ContentPaper } from '../components/commons/ContentPaper'
import { Loading } from '../components/commons/Loading'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Pagination from '@material-ui/lab/Pagination'
import { RouteComponentProps } from 'react-router'

export const withContentPaperContainer = (route: string, contentSubject: ContentSubject): React.FC<RouteComponentProps> => {

    const ContentPaperContainer: React.FC<RouteComponentProps> = (props) => {

        const loading = useAppSelector(state => state.contents.loading);
        const clubContents = useAppSelector(state => state.contents.clubContents);
        const groupContents = useAppSelector(state => state.contents.groupContents);
        const myContents = useAppSelector(state => state.myContents.contents);
        const myComments = useAppSelector(state => state.myComments.comments);
        /**
         * myContent, profile 추가
         */

        const renderPapers = () => {

            let contents: Array<Object>;

            switch (contentSubject) {

                case ContentSubject.CLUB_CONTENT:
                    contents = clubContents;
                    break;
                case ContentSubject.GROUP_CONTENT:
                    contents = groupContents;
                    break;
                case ContentSubject.MY_CONTENT:
                    contents = myContents;
                    break;
                case ContentSubject.MY_COMMENT:
                    contents = myComments;
                    break;
                case ContentSubject.PROFILE:
                    contents = clubContents;
                    break;
                default:
                    contents = [];
                    break;
            }


            console.log('clubContents: ', clubContents);
            console.log('groupContents: ', groupContents);

            if (contents) {
                console.log('contents: ', contents);
                return (
                    <List>
                        {contents.map(content =>
                            <ListItem>
                                <ContentPaper {...content} {...props} />
                            </ListItem>
                        )}
                    </List>
                )
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

    return ContentPaperContainer
}