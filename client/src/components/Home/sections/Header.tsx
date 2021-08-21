import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { useAppSelector } from '@redux/hooks';

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
    const auth = useAppSelector(state => state.auth.tokenMatch);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);


    const onMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const onMenuClose = () => {
        setAnchorEl(null);
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
                                    <MenuItem onClick={onMenuClose}>내 정보</MenuItem>
                                    <MenuItem onClick={onMenuClose}>내가 작성한 글</MenuItem>
                                    <MenuItem onClick={onMenuClose}>내가 작성한 댓글</MenuItem>
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