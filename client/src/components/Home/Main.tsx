import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { RouteComponentProps } from 'react-router'
import { Header } from '../commons/Header'
import Copyright from '../commons/Copyright';
import { SideBar } from '@components/commons/SideBar';
import { withContentPaperContainer } from '@hoc/withCotentPaperContainer';
import { ContentSubject, setContentSubject } from '@redux/modules/commons/contentMenu';
import { setIsCreateModalOpen } from '@redux/modules/home/createContent';
import { CreateContentModal } from './sections/CreateContentModal';

import Button from '@material-ui/core/Button';

const Main: React.FC<RouteComponentProps> = (props) => {
    const dispatch = useAppDispatch();
    const contentSubject = useAppSelector(state => state.contentMenu.contentSubject);
    const ContentPaperContainer = withContentPaperContainer('home', contentSubject);
    const auth = useAppSelector(state => state.auth.tokenMatch);
    const open = useAppSelector(state => state.createContent.isCreateModalOpen);

    useEffect(() => {
        dispatch(setContentSubject(ContentSubject.CLUB_CONTENT));
    }, [])

    useEffect(() => {
        console.log('contentSubject: ', contentSubject);
    }, [contentSubject])

    const onCreateContent = () => {
        dispatch(setIsCreateModalOpen(true));
    }

    return (
        <>
            <div style={{
                display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between', alignItems: 'center',
                overflow: 'auto',
            }}>
                <Header {...props} />
                <ContentPaperContainer />
                <div style={{
                    display: 'flex', justifyContent: 'flex-end',
                    width: '70%', margin: '0px, 10px',
                }}>
                    {auth
                        &&
                        <Button variant='outlined' color='primary'
                            onClick={onCreateContent}
                        >
                            글 작성
                        </Button>
                    }
                </div>
                <SideBar {...props} />
                <Copyright />
            </div>
            {open && <CreateContentModal />}
        </>
    )
}

export default Main;