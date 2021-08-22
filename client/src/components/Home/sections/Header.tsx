import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { postLogout } from '@redux/modules/auth/logout';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

export const Header: React.FC<RouteComponentProps> = (props) => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const auth = useAppSelector(state => state.auth.tokenMatch);
    const userID = useAppSelector(state => state.auth.userID);
    const logoutSuccess = useAppSelector(state => state.logout.success);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

    useEffect(() => {
        console.log('logoutSuccess: ', logoutSuccess);
        if (logoutSuccess) {
            window.location.reload();
        }
    }, [logoutSuccess])

    useEffect(() => {
        console.log('header auth: ', auth)
    }, [auth])

    const onMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const onMenuClose = () => {
        setAnchorEl(null);
    }

    const onMyPage = () => {
        onMenuClose();
        props.history.push(`/contents/${userID}`);
    }

    const onLogOut = () => {
        dispatch(postLogout());
    }

    return (
        <div className={classes.root}>
            <AppBar>
                <Toolbar>
                    <IconButton
                        edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                        onClick={() => props.history.push('/')}
                    >
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Ginger
                    </Typography>

                    {
                        auth
                            ?
                            <>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={onMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>

                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={isMenuOpen}
                                    onClose={onMenuClose}
                                >
                                    <MenuItem onClick={onMyPage}>My Page</MenuItem>
                                    <MenuItem onClick={onLogOut}>로그아웃</MenuItem>
                                </Menu>
                            </>
                            :
                            <>
                                <Button variant="contained" onClick={() => props.history.push('/login')}>
                                    Login
                                </Button>
                            </>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}