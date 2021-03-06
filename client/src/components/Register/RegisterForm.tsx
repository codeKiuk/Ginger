import React from 'react'
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch } from '@redux/hooks';
import { RouteComponentProps } from 'react-router';
import { getIsUserIDduplicated, postRegister } from '@redux/modules/auth/register';
import { postLogin } from '@redux/modules/auth/login';
import Copyright from '../commons/Copyright';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useAuthLoading } from '@hooks/loading/useAuthLoading';

type Register = {
    userID: string,
    password: string,
}

export const RegisterForm: React.FC<RouteComponentProps> = (props) => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const loading = useAuthLoading();
    const { control, handleSubmit, formState: { errors }, } = useForm<Register>();


    const onSubmit = handleSubmit(async (data) => {

        const res = await dispatch(postRegister(data));

        if (res.payload.success) {
            const loginRes = await dispatch(postLogin({ userID: res.payload.userID, password: res.payload.password }));
            if (loginRes.payload.success) {
                props.history.push('/home');
            }
        } else {    // server error

        }
    })

    const onLoginClick = () => {
        props.history.push('/login');
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form onSubmit={onSubmit} className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Controller
                                name='userID'
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: true,
                                    pattern: /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i,
                                    validate: {
                                        asyncValidate: async (value) => {
                                            const res = await dispatch(getIsUserIDduplicated({ userID: value }));
                                            return res.payload.isDuplicated === false;
                                        }
                                    }
                                }}
                                render={({ field }) =>
                                    <>
                                        <TextField
                                            {...field}
                                            variant="outlined"
                                            fullWidth
                                            id="email"
                                            placeholder="???????????? ??????????????????"
                                        />
                                        {errors.userID?.type === 'required' && <p className={classes.errorMessage}>???????????? ??????????????????.</p>}
                                        {errors.userID?.type === 'pattern' && <p className={classes.errorMessage}>????????? ????????? ?????? ????????????.</p>}
                                        {errors.userID?.type === 'asyncValidate' && <p className={classes.errorMessage}>?????? ???????????? ??????????????????.</p>}
                                    </>
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name='password'
                                control={control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field }) =>
                                    <>
                                        <TextField
                                            {...field}
                                            placeholder="??????????????? ??????????????????"
                                            variant="outlined"
                                            fullWidth
                                            id="password"
                                            autoComplete="current-password"
                                        />
                                        {errors.password?.type === 'required' && <p className={classes.errorMessage}>??????????????? ??????????????????.</p>}
                                    </>
                                }

                            />
                        </Grid>
                    </Grid>
                    {
                        loading
                            ?
                            <CircularProgress />
                            :
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign Up
                            </Button>
                    }
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link onClick={onLoginClick} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>

    )
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    errorMessage: {
        fontSize: '0.8rem',
        padding: '10px',
        margin: '0px',
        color: 'red',
    },
}));