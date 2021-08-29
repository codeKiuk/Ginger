import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { postLogout } from '@redux/modules/auth/logout';
import { ContentSubject, setContentMenuOpen, setContentSubject } from '@redux/modules/commons/contentMenu'

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
import MenuIcon from '@material-ui/icons/Menu';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
    const isMyMenuOpen = Boolean(anchorEl);

    useEffect(() => {
        // console.log('logoutSuccess: ', logoutSuccess);
        if (logoutSuccess) {
            window.location.reload();
        }
    }, [logoutSuccess])

    useEffect(() => {
        // console.log('header auth: ', auth)
    }, [auth])

    const onMyMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const onMyMenuClose = () => {
        setAnchorEl(null);
    }

    const onMyPage = () => {
        onMyMenuClose();
        dispatch(setContentSubject(ContentSubject.MY_CONTENT))
        props.history.push(`/my-page/${userID}`);
    }

    const onLogOut = () => {
        dispatch(postLogout());
    }

    const onContentsMenuOpen = () => {
        dispatch(setContentMenuOpen(true));
    }

    const onHomeClick = () => {
        dispatch(setContentSubject(ContentSubject.CLUB_CONTENT))
        props.history.push('/home');
    }

    return (
        <div className={classes.root}>
            <AppBar>
                <Toolbar>
                    <IconButton
                        edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                        onClick={onHomeClick}
                    >
                        <HomeIcon />
                    </IconButton>
                    <IconButton
                        edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                        onClick={onContentsMenuOpen}
                    >
                        <MenuIcon />
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
                                    onClick={onMyMenuOpen}
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
                                    open={isMyMenuOpen}
                                    onClose={onMyMenuClose}
                                >
                                    <MenuItem onClick={onMyPage}>
                                        <IconButton
                                            edge="start" className={classes.menuButton} color="inherit"
                                        >
                                            <InsertEmoticonIcon />
                                        </IconButton>
                                        My Page:<p style={{ marginLeft: '2px' }}>{userID}</p>
                                    </MenuItem>
                                    <MenuItem onClick={onLogOut}>
                                        <IconButton
                                            edge="start" className={classes.menuButton} color="inherit"
                                        >
                                            <ExitToAppIcon />
                                        </IconButton>
                                        로그아웃
                                    </MenuItem>
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
        </div >
    )
}