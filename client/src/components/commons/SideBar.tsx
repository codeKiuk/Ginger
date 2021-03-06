import React from 'react'
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { RouteComponentProps } from 'react-router'
import { setContentMenuOpen, ContentSubject } from '@redux/modules/commons/contentMenu';
import { useBoardType } from '@hooks/contents/useBoardType'

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import TocIcon from '@material-ui/icons/Toc';

const SideBar: React.FC<RouteComponentProps> = (props) => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const isContentsMenuOpen = Boolean(useAppSelector(state => state.contentMenu.isOpen));
    const { switchMenu } = useBoardType();

    const onContentsMenuClose = () => {
        dispatch(setContentMenuOpen(false));
    }

    const ContentsMenuList = (menus: Array<{ title: string, subject: ContentSubject }>) => {

        return (
            <div
                className={classes.list}
                onClick={onContentsMenuClose}
            >
                <List
                    style={{ width: '100%', height: '100%' }}
                >
                    {menus.map((menu, index) => {
                        return (
                            <ListItem button key={menu.subject} onClick={() => switchMenu(menu.subject)}>
                                <IconButton >
                                    <TocIcon />
                                </IconButton>
                                <ListItemText primary={menu.title} />
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
            {props.match.path.includes('/home') && ContentsMenuList(homeContentsMenuList)}
            {props.match.path.includes('/my-page') && ContentsMenuList(myPageContentsMenuList)}
        </Drawer>
    )
}

const myPageContentsMenuList = [
    {
        title: '?????? ??? ???',
        subject: ContentSubject.MY_CONTENT
    },
    {
        title: '?????? ??? ??????',
        subject: ContentSubject.MY_COMMENT,
    }
];
const homeContentsMenuList = [
    {
        title: '????????? / ??????',
        subject: ContentSubject.CLUB_CONTENT,
    },
    {
        title: '????????? / ?????????',
        subject: ContentSubject.GROUP_CONTENT
    },

];

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default SideBar