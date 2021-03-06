import React from 'react'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export const ContentPaper: React.FC<any> = (props) => {
    const classes = useStyles();
    const title = props.title;
    const contents = props.content;
    const userID = props.userID;
    const contentID = props._id;

    const onOpen = () => {
        props.history.push(`/home/${contentID}`)
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {userID}
                </Typography>
                <Typography variant="body2" component="p">
                    {contents}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={onOpen}>더 보기</Button>
            </CardActions>
        </Card>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
    })
)