import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { useForm, Controller } from "react-hook-form";
import { Header } from '@components/commons/Header'
import { RouteComponentProps } from 'react-router'
import { SideBar } from '@components/commons/SideBar'
import Copyright from '@components/commons/Copyright'
import { Loading } from '@components/commons/Loading';
import { CreateComment } from './sections/CreateComment';
import { UpdateContentModal } from './sections/UpdateContentModal';
import { getComments, getSingleContent, deleteComment } from '@redux/modules/content/comments'
import { deleteContent } from '@redux/modules/home/contents';
import { setUpdateContentModal } from '@redux/modules/content/updateContentModal';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
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
            width: '100%', margin: '0px, 10px',
        },
        commentInputContainer: {
            width: '80vw',
            maxWidth: '700px'
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
        commentsSection: {
            width: '100%',
            height: '20%',
        }
    })
)

type MatchParams = {
    contentID?: string,
}

type CreateComment = {
    comment: string,
}

export const ContentDetail: React.FC<RouteComponentProps> = (props: RouteComponentProps<MatchParams>) => {
    const classes = useStyles();
    const dispatch = useAppDispatch();

    const isUpdateModalOpen = useAppSelector(state => state.updateContentModal.isOpen);
    const auth = useAppSelector(state => state.auth.tokenMatch);
    const loading = useAppSelector(state => state.comments.loading);
    const comments = useAppSelector(state => state.comments.comments);
    const contentID = props.match.params.contentID;
    const userID = useAppSelector(state => state.auth.userID);
    const aboutThisContent = useAppSelector(state => state.comments.singleContent);

    useEffect(() => {
        dispatch(getComments({ contentID: contentID ? contentID : '' }));
        dispatch(getSingleContent({ contentID: contentID ? contentID : '' }));

    }, [])

    const onContentDelete = async () => {
        await dispatch(deleteContent({ contentID: contentID ? contentID : '' }))
        props.history.push('/home')
    }

    const onCommentDelete = async (commentID: string) => {
        await dispatch(deleteComment({ commentID: commentID }));
        dispatch(getComments({ contentID: contentID ? contentID : '' }));
    }

    const onUpdate = () => {
        dispatch(setUpdateContentModal(true));
    }

    const renderComments = () => (
        <>
            <h3 style={{ marginLeft: '20px' }}>댓글</h3>
            {comments.map(comment => (
                <ListItem >
                    <Card className={classes.commentsSection}>
                        <CardContent>
                            <Typography variant="body1" component="p">
                                {comment.comment}
                            </Typography>
                            <Typography variant="body2" component="p">
                                작성자: {comment.userID}
                            </Typography>
                        </CardContent>
                        {
                            comment.userID === userID
                            &&
                            <CardActions>
                                <Button onClick={() => onCommentDelete(comment._id)} color="secondary">삭제</Button>
                            </CardActions>
                        }
                    </Card>
                </ListItem>
            ))}
        </>
    )

    return (
        <div className={classes.main}>
            <main style={{
                display: 'flex', flexDirection: 'column',
                justifyContent: 'center', alignItems: 'center',
                width: '80vw', maxWidth: '750px', height: '750px',
                backgroundColor: 'whitesmoke',
                marginTop: '100px', overflow: 'auto',
            }}>
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
                                        {aboutThisContent?.title}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        작성자: {aboutThisContent?.userID}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </ListItem>

                        {/* 본문 */}
                        <ListItem >
                            <Card className={classes.bodyCard}>
                                <CardContent>
                                    <Typography variant="body1" component="p">
                                        {aboutThisContent?.content}
                                    </Typography>
                                </CardContent>
                                {userID === aboutThisContent?.userID
                                    &&
                                    <CardActions>
                                        <Button variant="outlined" color="primary" onClick={onUpdate}>수정</Button>
                                        <Button variant="outlined" color="secondary" onClick={onContentDelete}>삭제</Button>
                                    </CardActions>
                                }
                            </Card>
                        </ListItem>

                        {/* 댓글 */}
                        {renderComments()}
                    </List>
                }
            </main>
            {/* 글 수정 */}
            {isUpdateModalOpen && <UpdateContentModal contentID={contentID} />}
            <Header {...props} />
            <SideBar {...props} />
            <br />
            {/* 댓글 작성 */}
            <CreateComment {...props} contentID={contentID} renderComments={renderComments} />
            <Copyright />
        </div >
    )
}