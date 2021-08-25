import React from 'react'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minWidth: 275,
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
    })
)

type ContentProp = {
    content: {
        title: string,
        contents: string,
        userID: string,
    }
}

export const ContentPaper: React.FC<any> = ({ content }) => {
    const classes = useStyles();
    const title = content.title;
    const contents = content.content;
    const userID = content.userID

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
                <Button size="small">더 보기</Button>
            </CardActions>
        </Card>
    )
}