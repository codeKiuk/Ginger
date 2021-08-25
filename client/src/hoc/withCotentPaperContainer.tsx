import { useAppDispatch, useAppSelector } from '@redux/hooks'
import React, { useEffect } from 'react'
import { ContentSubject } from '@redux/modules/commons/contentMenu'
import { ContentPaper } from '../components/commons/ContentPaper'
import { Loading } from '../components/commons/Loading'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Pagination from '@material-ui/lab/Pagination'

export const withContentPaperContainer = (route: string, contentSubject: ContentSubject): React.FC<{}> => {

    const ContentPaperContainer: React.FC<{}> = () => {

        const loading = useAppSelector(state => state.contents.loading);
        const clubContents = useAppSelector(state => state.contents.clubContents);
        const groupContents = useAppSelector(state => state.contents.groupContents);
        /**
         * myContent, profile 추가
         */

        useEffect(() => {

        }, [clubContents, groupContents])

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
                    contents = clubContents;
                    break;
                case ContentSubject.MY_COMMENT:
                    contents = clubContents;
                    break;
                case ContentSubject.PROFILE:
                    contents = clubContents;
                    break;
                default:
                    contents = clubContents;
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
                                <ContentPaper content={content} />
                            </ListItem>
                        )}
                    </List>
                )
            }
        }

        return (
            <>
                <div style={{
                    width: '750px', height: '750px',
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