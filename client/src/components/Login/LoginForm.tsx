import React, { useEffect, useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import login, { postLogin } from '@redux/modules/auth/login'
import { RouteComponentProps } from 'react-router';
import Copyright from '../commons/Copyright';
import { getIsUserIDduplicated } from '@redux/modules/auth/register';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SpeakerPhoneTwoTone } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
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
        marginTop: theme.spacing(1),
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

type Login = {
    userID: string;
    password: string;
};

const LoginForm: React.FC<RouteComponentProps> = (props) => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const loginSuccess = useAppSelector(state => state.login.success);
    const [passwordErr, setPasswordErr] = useState(Boolean);
    const loading = useAppSelector(state => state.login.loading);
    const { control, handleSubmit, formState: { errors } } = useForm<Login>();

    useEffect(() => {

        if (loginSuccess) {
            props.history.push('/home');
        } else {
            props.history.push('/login');
        }
    }, [loginSuccess])

    const onSubmit = handleSubmit(data => {
        console.log('data: ', data);
        dispatch(postLogin(data))
            .then((res) => {
                if (!res.payload.success) {
                    setPasswordErr(true);
                }
            });
    });

    const onRegisterClick = () => {
        props.history.push('/register');
    }


    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form
                        onSubmit={onSubmit}
                        className={classes.form} noValidate
                    >
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
                                        return res.payload.isDuplicated === true;
                                    }
                                }
                            }}
                            render={({ field }) =>
                                <>
                                    <TextField
                                        {...field}
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        id="email"
                                        autoFocus
                                    />
                                    {errors.userID?.type === 'required' && <p className={classes.errorMessage}>이메일을 입력해주세요.</p>}
                                    {errors.userID?.type === 'pattern' && <p className={classes.errorMessage}>이메일 형식이 맞지 않습니다.</p>}
                                    {errors.userID?.type === 'asyncValidate' && <p className={classes.errorMessage}>가입되어 있지 않은 이메일입니다.</p>}
                                </>
                            }
                        />
                        <Controller
                            name='password'
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                            }}
                            render={({ field }) =>
                                <>
                                    <TextField
                                        {...field}
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                    {errors.password?.type === 'required' && <p className={classes.errorMessage}>비밀번호를 입력해주세요.</p>}
                                    {passwordErr && <p className={classes.errorMessage}>비밀번호가 맞지 않습니다.</p>}
                                </>
                            }
                        />
                        {
                            loading
                                ?
                                <Button
                                    fullWidth
                                    variant='contained'
                                    className={classes.submit}
                                >
                                    <CircularProgress />
                                </Button>
                                :
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Sign In
                                </Button>
                        }
                        <Grid container>
                            {/* <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid> */}
                            <Grid item>
                                <Link onClick={onRegisterClick} variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    )
}

export default LoginForm