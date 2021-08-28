import React, { useEffect, useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { setUpdateContentModal } from '@redux/modules/content/updateContentModal';
import { updateContent } from '@redux/modules/content/updateContentModal';
import { getSingleContent } from '@redux/modules/content/comments';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        background: {
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 20000, position: 'fixed',
            width: '100vw', height: '100vh', background: 'rgba(0, 0, 0, 0.25)',
        },
        modal: {
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            width: '80vw', maxWidth: '700px', height: '700px', padding: '10px'
        },
        form: {
            height: '100%',
        },
        checkBox: {
            padding: '10px'
        },
        btnGroup: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },
        btn: {
            margin: '0 5px'
        },
        errorMessage: {
            fontSize: '0.8rem',
            padding: '10px',
            margin: '0px',
            color: 'red',
        }
    }))

type UpdateContent = {
    title: string,
    content: string,
}

export const UpdateContentModal: React.FC<any> = (props) => {
    const classes = useStyles();
    const dispatch = useAppDispatch();

    const userID = useAppSelector(state => state.auth.userID);
    const contentID = props.contentID
    const aboutThisContent = useAppSelector(state => state.comments.singleContent);
    const { control, handleSubmit, formState: { errors } } = useForm<UpdateContent>();

    const onSubmit = handleSubmit(async (data) => {
        await dispatch(updateContent({ ...data, contentID: contentID }))
        dispatch(setUpdateContentModal(false));
        dispatch(getSingleContent({ contentID: contentID ? contentID : '' }));
    })

    const onCancel = () => {
        dispatch(setUpdateContentModal(false));
    }

    return (
        <div className={classes.background}>
            <Paper elevation={3}>
                <div className={classes.modal}>
                    <form
                        className={classes.form}
                        onSubmit={onSubmit}
                    >
                        <Controller
                            name='title'
                            control={control}
                            defaultValue={aboutThisContent.title}
                            rules={{ required: true }}
                            render={({ field }) =>
                                <>
                                    <TextField
                                        {...field}
                                        placeholder='제목'
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        id="title"
                                        autoFocus
                                    />
                                    {errors.title?.type === 'required' && <p className={classes.errorMessage}>제목을 입력해주세요</p>}
                                </>
                            }
                        />
                        <Controller
                            name='content'
                            control={control}
                            defaultValue={aboutThisContent.content}
                            rules={{ required: true }}
                            render={({ field }) =>
                                <>
                                    <TextField
                                        {...field}
                                        placeholder='내용'
                                        multiline={true}
                                        rows={23}
                                        variant='outlined'
                                        margin='normal'
                                        fullWidth
                                        id='content'
                                        autoFocus
                                    />
                                    {errors.content?.type === 'required' && <p className={classes.errorMessage}>내용을 입력해주세요</p>}
                                </>
                            }
                        />
                        <div className={classes.btnGroup}>
                            <Button className={classes.btn} variant='outlined' color='primary' onClick={onSubmit}>
                                수정
                            </Button>
                            <Button className={classes.btn} variant='outlined' color='secondary' onClick={onCancel}>
                                취소
                            </Button>
                        </div>
                    </form>
                </div>
            </Paper>
        </div>
    )
}