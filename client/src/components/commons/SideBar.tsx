import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { RouteComponentProps } from 'react-router'
import { setContentsMenuOpen } from '@redux/modules/commons/contentsMenu';

import Divider from '@material-ui/core/Drawer';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import TocIcon from '@material-ui/icons/Toc';

const myPageContentsMenuList = ['프로필', '내가 쓴 글', '내가 쓴 댓글'];
const homeContentsMenuList = ['동아리 / 학회', '스터디 / 소모임'];

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export const SideBar: React.FC<RouteComponentProps> = (props) => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const isContentsMenuOpen = Boolean(useAppSelector(state => state.contentsMenu.isOpen));

    useEffect(() => {
        console.log('props: ', props);
        // props.match. path === '/home' || '/my-page'
    }, [isContentsMenuOpen])

    const onContentsMenuClose = () => {
        dispatch(setContentsMenuOpen(false));
    }

    const ContentsMenuList = (listTitles: Array<string>) => {

        return (
            <div
                className={classes.list}
                onClick={onContentsMenuClose}
            >
                <List
                    style={{ width: '100%', height: '100%' }}
                >
                    {listTitles.map((title, index) => {
                        return (
                            <ListItem button key={title}>
                                <IconButton >
                                    <TocIcon />
                                </IconButton>
                                <ListItemText primary={title} />
                            </ListItem>
                        )
                    })}
                </List>
            </div>
        )
    }

    return (
        <Drawer
            open={isContentsMenuOpen}
            onClose={onContentsMenuClose}
        >
            {props.match.path === '/home' && ContentsMenuList(homeContentsMenuList)}
            {props.match.path === '/my-page' && ContentsMenuList(myPageContentsMenuList)}
        </Drawer>
    )
}