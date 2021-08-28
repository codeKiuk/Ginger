import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { useForm, Controller } from "react-hook-form";
import { postComment, getComments } from '@redux/modules/content/comments';

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
    })
)

type CreateComment = {
    comment: string,
}

export const CreateComment: React.FC<any> = (props) => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const { control, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm<CreateComment>();

    const auth = useAppSelector(state => state.auth.tokenMatch);
    const contentID = props.contentID;
    const userID = useAppSelector(state => state.auth.userID);

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({ comment: '' });
            props.renderComments();
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

    return (
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
    )
}