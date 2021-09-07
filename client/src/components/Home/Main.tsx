import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { RouteComponentProps } from 'react-router'
import { Header } from '@commons/Header'
import Copyright from '@commons/Copyright';
import { SideBar } from '@components/commons/SideBar';
import { withPaperContainer } from '@hoc/withPaperContainer';
import { CreateContentModal } from './sections/CreateContentModal';
import { useContents } from '@hooks/contents/useContents';
import { useFetchPage } from '@hooks/pagination/useFetchPage';

import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const Main: React.FC<RouteComponentProps> = (props) => {
    const classes = useStyles();
    const contentSubject = useAppSelector(state => state.contentMenu.contentSubject);
    const PaperContainer = withPaperContainer('home', contentSubject);
    const open = useAppSelector(state => state.createContentModal.isCreateModalOpen);
    const { openCreateContentModal } = useContents();
    const { getPapers } = useFetchPage();

    useEffect(() => {
        getPapers(1);
    }, [contentSubject])

    return (
        <main className={classes.main} >
            {open && <CreateContentModal />}
            <Header {...props} />
            <PaperContainer {...props} />
            <div className={classes.btnGroup} >
                <Button variant='outlined' color='primary'
                    onClick={() => openCreateContentModal(props)}
                >
                    글 작성
                </Button>
            </div>
            <SideBar {...props} />
            <Copyright />
        </main>
    )
}

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

export default Main;