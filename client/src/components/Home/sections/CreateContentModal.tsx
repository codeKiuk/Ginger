import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { useContents } from '@hooks/contents/useContents';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ContentSubject } from '@redux/modules/commons/contentMenu';

type CreateContent = {
    checkClub: boolean,
    checkGroup: boolean,
    title: string,
    content: string,
    userID: string,
}

const CreateContentModal: React.FC<{}> = () => {
    const classes = useStyles();
    const { onPostContent, closeCreateContentModal } = useContents();
    const { control, handleSubmit, formState: { errors } } = useForm<CreateContent>();
    const [checkState, setCheckState] = useState({
        club: false,
        group: false,
    })

    const onCheckHandler = (event: React.ChangeEvent<HTMLInputElement>) => {

        // 하나만 체크할 수 있도록
        if (event.currentTarget.name === 'club') {
            if (checkState.group === true) {
                return;
            }

        } else {
            if (checkState.club === true) {
                return;
            }
        }

        setCheckState({ ...checkState, [event.currentTarget.name]: event.currentTarget.checked })
    }

    const onSubmit = handleSubmit(data => {
        if (checkState.club === false && checkState.group === false) {
            return;
        }

        if (checkState.club) {
            onPostContent({ ...data, subject: ContentSubject.CLUB_CONTENT });
        } else {
            onPostContent({ ...data, subject: ContentSubject.GROUP_CONTENT })
        }

    })

    const onCancel = () => {
        closeCreateContentModal();
    }

    return (
        <div className={classes.background}>
            <Paper elevation={3}>
                <div className={classes.modal}>
                    <form
                        className={classes.form}
                        onSubmit={onSubmit}
                    >
                        <div className={classes.checkBox}>
                        </div>
                        <Controller
                            name='checkClub'
                            control={control}
                            render={({ field }) =>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checkState.club}
                                            onChange={onCheckHandler}
                                            color='primary' name='club' />}
                                    label='동아리 / 학회' />
                            }
                        />
                        <Controller
                            name='checkGroup'
                            control={control}
                            render={({ field }) =>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checkState.group}
                                            onChange={onCheckHandler}
                                            color='primary' name='group' />}
                                    label='스터디 / 소모임' />
                            }
                        />
                        <Controller
                            name='title'
                            defaultValue=''
                            control={control}
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
                            defaultValue=''
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) =>
                                <>
                                    <TextField
                                        {...field}
                                        multiline={true}
                                        rows={23}
                                        placeholder='내용'
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
                                작성
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

export default CreateContentModal