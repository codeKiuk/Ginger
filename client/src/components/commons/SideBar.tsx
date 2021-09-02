import React from 'react'
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { RouteComponentProps } from 'react-router'
import { setContentMenuOpen, ContentSubject, setContentSubject } from '@redux/modules/commons/contentMenu';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import TocIcon from '@material-ui/icons/Toc';

const myPageContentsMenuList = ['내가 쓴 글', '내가 쓴 댓글'];
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
    const isContentsMenuOpen = Boolean(useAppSelector(state => state.contentMenu.isOpen));

    const onContentsMenuClose = () => {
        dispatch(setContentMenuOpen(false));
    }

    const onClickContentsMenu = (title: string) => {
        switch (title) {
            case '동아리 / 학회':
                dispatch(setContentSubject(ContentSubject.CLUB_CONTENT));
                break;
            case '스터디 / 소모임':
                dispatch(setContentSubject(ContentSubject.GROUP_CONTENT));
                break;
            case '내가 쓴 글':
                dispatch(setContentSubject(ContentSubject.MY_CONTENT));
                break;
            case '내가 쓴 댓글':
                dispatch(setContentSubject(ContentSubject.MY_COMMENT));
                break;
            default:
                break;
        }
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
                            <ListItem button key={title} onClick={() => onClickContentsMenu(title)}>
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
            {props.match.path.includes('/home') && ContentsMenuList(homeContentsMenuList)}
            {props.match.path.includes('/my-page') && ContentsMenuList(myPageContentsMenuList)}
        </Drawer>
    )
}