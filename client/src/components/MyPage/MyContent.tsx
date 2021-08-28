import React, { useEffect } from 'react'

import { Header } from '../../components/commons/Header'
import { SideBar } from '@components/commons/SideBar'
import Copyright from '@components/commons/Copyright'
import { RouteComponentProps } from 'react-router'
import { withPaperContainer } from '@hoc/withPaperContainer'
import { ContentSubject, setContentSubject } from '@redux/modules/commons/contentMenu';
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { getMyComments } from '@redux/modules/myPage/myComments'
import { getMyContents } from '@redux/modules/myPage/myContents'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between', alignItems: 'center',
            overflow: 'auto',
        },
    })
)

const MyContent: React.FC<RouteComponentProps> = (props) => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const contentSubject = useAppSelector(state => state.contentMenu.contentSubject);
    const userID = useAppSelector(state => state.auth.userID);
    const PaperContainer = withPaperContainer('my-page', contentSubject);

    useEffect(() => {
        dispatch(setContentSubject(ContentSubject.MY_CONTENT));
        dispatch(getMyContents({ userID: userID, page: 1, perPage: 10 }));

    }, [])

    useEffect(() => {
        switch (contentSubject) {
            case ContentSubject.MY_CONTENT:
                dispatch(getMyContents({ userID: userID, page: 1, perPage: 10 }))
                break;
            case ContentSubject.MY_COMMENT:
                dispatch(getMyComments({ userID: userID, page: 1, perPage: 10 }));
                break;
            default:
                break;
        }
    }, [contentSubject])

    return (
        <main className={classes.main}>
            <Header {...props} />
            <PaperContainer {...props} />
            <SideBar {...props} />
            <Copyright />
        </main>
    )
}

export default MyContent