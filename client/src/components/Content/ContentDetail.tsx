import React, { useEffect } from 'react'
import { useForm, Controller } from "react-hook-form";
import { Header } from '@components/commons/Header'
import { RouteComponentProps } from 'react-router'
import { SideBar } from '@components/commons/SideBar'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { getComments, getSingleContent, postComment } from '@redux/modules/content/comments'
import Copyright from '@components/commons/Copyright'
import { Loading } from '@components/commons/Loading';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
    const { control, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm<CreateComment>();

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

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({ comment: '' });
            renderComments();
        }
    }, [isSubmitSuccessful, reset]);

    const onCreateComment = handleSubmit(data => {

        if (!auth) {
            props.history.push('/login')
            return;
        }

        dispatch(postComment({
            userID: userID,
            comment: data.comment,
            contentID: contentID ? contentID : '',
        }))
            .then(res => {
                // console.log('postComments res', res);
                if (res.payload.success) {
                    dispatch(getComments({ contentID: contentID ? contentID : '' }))
                }
            })

    })

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
                {!loading
                    &&
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
                        <ListItem >
                            <Card className={classes.bodyCard}>
                                <CardContent>
                                    <Typography variant="body1" component="p">
                                        {aboutThisContent?.content}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </ListItem>
                        {renderComments()}
                    </List>
                }
            </main>
            <Header {...props} />
            <SideBar {...props} />
            <br />
            <div className={classes.commentInputContainer}>
                <form
                    onSubmit={onCreateComment}
                >
                    <Controller
                        name="comment"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) =>
                            <>
                                <TextField
                                    {...field}
                                    multiline={true}
                                    rows={3}
                                    placeholder='댓글'
                                    variant='outlined'
                                    margin='normal'
                                    fullWidth
                                    id='comment'
                                    autoFocus
                                />
                                {errors.comment?.type === 'required' && <p className={classes.errorMessage}>내용을 입력해주세요</p>}
                            </>
                        }
                    />
                    <div className={classes.btnGroup} >
                        <Button variant='outlined' color='primary'
                            onClick={onCreateComment}
                        >
                            댓글 작성
                        </Button>
                    </div>
                </form>
            </div>

            <Copyright />
        </div >
    )
}