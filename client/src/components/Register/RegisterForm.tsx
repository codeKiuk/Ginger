import React, { useEffect } from 'react'
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { RouteComponentProps } from 'react-router';
import { postRegister } from '@redux/modules/register';
import { postLogin } from '@redux/modules/login';
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

type Register = {
    userID: String,
    password: String,
    confirmPassword: String
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
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export const RegisterForm: React.FC<RouteComponentProps> = (props) => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const loading = useAppSelector(state => state.register.loading);
    const { control, handleSubmit, formState: { errors } } = useForm<Register>();

    useEffect(() => {

    }, [loading])

    const onSubmit = handleSubmit(async (data) => {
        // console.log(data);
        const res = await dispatch(postRegister(data));
        console.log('register response', res);
        // .then(res => {
        //     // 이메일 중복 체크 => if !res.payload.success && res.payload.isDuplicated
        //     console.log(res)
        // });
        if (res.payload.success) {
            const loginRes = await dispatch(postLogin({ userID: res.payload.userID, password: res.payload.password }));
            console.log('loginRes: ', loginRes);
            if (loginRes.payload.success) {

                props.history.push('/');
            }
        } else if (res.payload.isDuplicated) {

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
                                render={({ field }) =>
                                    <TextField
                                        {...field}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name='password'
                                control={control}
                                defaultValue=""
                                render={({ field }) =>
                                    <TextField
                                        {...field}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                }
                            />
                        </Grid>
                        {/* <Grid item xs={12}>
                            <Controller
                                name='confirmPassword'
                                control={control}
                                defaultValue=""
                                render={({ field }) =>
                                    <TextField
                                        {...field}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Confirm Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                }
                            />

                        </Grid> */}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
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