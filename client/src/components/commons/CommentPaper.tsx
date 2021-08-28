import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@redux/hooks'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        commentsSection: {
            width: '100%',
            height: '20%',
        }
    })
)

export const CommentPaper: React.FC<any> = (props) => {

    const classes = useStyles();
    const dispatch = useAppDispatch();
    const auth = useAppSelector(state => state.auth.userID);
    const aboutThisComment = {
        userID: props.userID,
        comment: props.comment,
        contentID: props.contentID,
        contentType: props.contentType,
        _id: props._id,
    }

    const onOpen = () => {
        props.history.push(`/home/${aboutThisComment.contentID}`);
    }

    return (
        <Card className={classes.commentsSection}>
            <CardContent>
                <Typography variant="h5" component="p">
                    {aboutThisComment.comment}
                </Typography>
                <br />
                <Typography variant="body2" component="p">
                    작성자: {aboutThisComment.userID}
                </Typography>
                <Typography variant="body2" component="p">
                    게시판: {aboutThisComment.contentType === 0 ? '동아리 / 학회' : '스터디 / 소모임'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={onOpen} variant="text" >글 보기</Button>
            </CardActions>
        </Card>
    )
}