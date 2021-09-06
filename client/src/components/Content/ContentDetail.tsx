import React from 'react'
import { useAppSelector } from '@redux/hooks'
import { Header } from '@components/commons/Header'
import { RouteComponentProps } from 'react-router'
import { SideBar } from '@components/commons/SideBar'
import Copyright from '@components/commons/Copyright'
import { Loading } from '@components/commons/Loading';
import { CreateComment } from './sections/CreateComment';
import { UpdateContentModal } from './sections/UpdateContentModal';
import { useBoardLoading } from '@hooks/loading/useBoardLoading';
import { useSingleContent } from '@hooks/contentDetail/useSingleContent';
import { Comments } from './sections/Comments';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

type MatchParams = {
    contentID?: string,
}

export const ContentDetail = ({ ...props }: RouteComponentProps<MatchParams>) => {
    const classes = useStyles();

    const isUpdateModalOpen = useAppSelector(state => state.updateContentModal.isOpen);

    const loading = useBoardLoading();

    const contentID = props.match.params.contentID;
    const { singleContent, onDeleteContent, openUpdateContentModal } = useSingleContent(contentID ? contentID : '');
    const userID = useAppSelector(state => state.auth.userID);

    return (
        <div className={classes.container}>
            <main className={classes.main}>
                {loading && <Loading />}

                {/* 글 불러오기 로딩 완료 */}
                {!loading
                    &&

                    // 제목
                    <List style={{ width: '100%', height: '100%' }}>
                        <ListItem >
                            <Card className={classes.titleCard}>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {singleContent?.title}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        작성자: {singleContent?.userID}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </ListItem>

                        {/* 본문 */}
                        <ListItem >
                            <Card className={classes.bodyCard}>
                                <CardContent>
                                    <Typography variant="body1" component="p">
                                        {singleContent?.content}
                                        {!singleContent?.content && '삭제된 글입니다.'}
                                    </Typography>
                                </CardContent>
                                {userID === singleContent?.userID
                                    &&
                                    <CardActions>
                                        <Button variant="outlined" color="primary" onClick={openUpdateContentModal}>수정</Button>
                                        <Button variant="outlined" color="secondary" onClick={() => onDeleteContent(props)}>삭제</Button>
                                    </CardActions>
                                }
                            </Card>
                        </ListItem>

                        {/* 댓글 */}
                        {<Comments contentID={contentID ? contentID : ''} />}
                    </List>
                }
            </main>
            {/* 글 수정 */}
            {isUpdateModalOpen && <UpdateContentModal contentID={contentID} />}
            <Header {...props} />
            <SideBar {...props} />
            <br />
            {/* 댓글 작성 */}
            <CreateComment {...props} contentID={contentID} />
            <Copyright />
        </div >
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between', alignItems: 'center',
            overflow: 'auto',
        },
        main: {
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center',
            width: '80vw', maxWidth: '750px', height: '750px',
            backgroundColor: 'whitesmoke',
            marginTop: '100px', overflow: 'auto',
        },
        btnGroup: {
            display: 'flex', justifyContent: 'flex-end',
            width: '100%', margin: '0px, 10px',
        },
        errorMessage: {
            fontSize: '0.8rem',
            padding: '10px',
            margin: '0px',
            color: 'red',
        },
        titleCard: {
            width: '100%',
            maxWidth: '700px',
            height: '30%',
        },
        bodyCard: {
            width: '100%',
            maxWidth: '700px',
            height: '80%',
        },
    })
)