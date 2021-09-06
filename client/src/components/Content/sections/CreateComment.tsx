import React, { useEffect } from 'react'
import { useForm, Controller } from "react-hook-form";
import { useComments } from '@hooks/contentDetail/useComments';

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

type CreateComment = {
    comment: string,
}

export const CreateComment: React.FC<any> = (props) => {
    const classes = useStyles();
    const { control, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm<CreateComment>();

    const contentID = props.contentID;
    const { commentCreate } = useComments(contentID);

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({ comment: '' });
        }
    }, [isSubmitSuccessful, reset]);

    const onCreateComment = handleSubmit(data => {
        commentCreate(data, props);
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