import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getGroupContents, getClubContents } from '@redux/modules/contents/contents';
import { RouteComponentProps } from 'react-router'
import { Header } from '../commons/Header'
import Copyright from '../commons/Copyright';
import { SideBar } from '@components/commons/SideBar';
import { withPaperContainer } from '@hoc/withPaperContainer';
import { ContentSubject, setContentSubject } from '@redux/modules/commons/contentMenu';
import { setIsCreateModalOpen } from '@redux/modules/contents/createContentModal';
import { CreateContentModal } from './sections/CreateContentModal';

import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between', alignItems: 'center',
            overflow: 'auto',
        },
        btnGroup: {
            display: 'flex', justifyContent: 'flex-end',
            width: '70%', margin: '0px, 10px',
        }
    })
)

const Main: React.FC<RouteComponentProps> = (props) => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const contentSubject = useAppSelector(state => state.contentMenu.contentSubject);
    const PaperContainer = withPaperContainer('home', contentSubject);
    const auth = useAppSelector(state => state.auth.tokenMatch);
    const open = useAppSelector(state => state.createContentModal.isCreateModalOpen);
    const perPage = useAppSelector(state => state.pagination.perPage);

    useEffect(() => {

        switch (contentSubject) {
            case ContentSubject.CLUB_CONTENT:
                dispatch(getClubContents({ page: 1, perPage: perPage }));
                break;
            case ContentSubject.GROUP_CONTENT:
                dispatch(getGroupContents({ page: 1, perPage: perPage }));
                break;
            default:
                dispatch(getClubContents({ page: 1, perPage: perPage }));
                break;
        }
    }, [contentSubject])

    const onCreateContent = () => {
        if (auth) {
            dispatch(setIsCreateModalOpen(true));
        } else {
            props.history.push('/login');
        }
    }

    return (
        <main className={classes.main} >
            {open && <CreateContentModal />}
            <Header {...props} />
            <PaperContainer {...props} />
            <div className={classes.btnGroup} >
                <Button variant='outlined' color='primary'
                    onClick={onCreateContent}
                >
                    글 작성
                </Button>
            </div>
            <SideBar {...props} />
            <Copyright />
        </main>
    )
}

export default Main;