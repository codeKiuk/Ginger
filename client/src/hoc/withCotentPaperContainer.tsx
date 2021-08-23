import { useAppDispatch, useAppSelector } from '@redux/hooks'
import React, { useEffect } from 'react'
import { ContentSubject } from '@redux/modules/commons/contentMenu'
import { ContentPaper } from '../components/commons/ContentPaper'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Pagination from '@material-ui/lab/Pagination'

export const withContentPaperContainer = (route: string, contentSubject: ContentSubject): React.FC<{}> => {

    const ContentPaperContainer: React.FC<{}> = () => {

        const clubContents = useAppSelector(state => state.clubContent.contents);
        const groupContents = useAppSelector(state => state.clubContent.contents);
        /**
         * myContent, profile 추가
         */

        useEffect(() => {

        }, [clubContents, groupContents])

        const renderPapers = () => {

            let contents: Array<Object> = []

            switch (contentSubject) {

                case ContentSubject.CLUB_CONTENT:
                    contents = clubContents;
                    break;
                case ContentSubject.GROUP_CONTENT:
                    contents = groupContents;
                    break;
                case ContentSubject.MY_CONTENT:

                    break;
                case ContentSubject.MY_COMMENT:

                    break;
                case ContentSubject.PROFILE:

                    break;
                default:
                    break;
            }

            if (!contents) {

                return (
                    <div>

                    </div>
                )
            }

            return (
                <List>
                    {contents.map(content => {
                        <ListItem>
                            <ContentPaper>
                            </ContentPaper>
                            hihi
                        </ListItem>
                    })}
                </List>
            )
        }

        return (
            <>
                <div style={{
                    width: '750px', height: '750px',
                    backgroundColor: 'whitesmoke',
                    marginTop: '100px',
                }}>
                    {renderPapers()}
                </div>
                <br />
                <Pagination />
            </>
        )
    }

    return ContentPaperContainer
}